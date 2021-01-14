<template>
    <div id="tree-map-container" :style="{width:600,height:600}">
    </div>
</template>
<script>
import * as d3 from 'd3';
// import  treemap  from 'C:/Users/123456/Desktop/大三上/可视化/hw2/code/src/components/treemap/treemap.vue';

export default {
    name: 'TreeMap',
    props:['options'],
    data:()=>({
            tree: null,
            g: null,
            chart: null,
            title: null,
            titleText: 'TreeMap',
            titleRectWidth: 460,
            titleRectHeight: 40,
            width:860,
            height:960,
            chartPadding : {top: 100, right: 80, bottom: 80, left: 80},
            data: {
                name:'Country',
                children:[
                {   name: 'US', 
                    children:[
                        {   name:'California',
                            children:[
                                {name:'Alameda',vlaue:1910},
                                {name:'Los Angeles',value:2222},
                                {name:'Nevada',value:1323},
                                {name:'San Diego',value:1824},
                                {name:'Sutter',value:156}
                            ]},
                        {   name:'Washington',
                            children:[
                                {name:'Seattle',value:3332},
                                {name:'Vancouver',value:247}
                            ]},
                        {   name:'Arizona',value:1111}
                    ]
                },
                {   name: 'Italy', 
                    children:[
                        {name:'Paris',value: 2150},
                        {name:'Missipi',value:1000}
                    ]
                },
                {   name: 'Rusia', 
                    children:[
                        {name:'Moscow',value: 1612}
                    ]
                },
                {   name: 'Brasil', value: 1474},
                {   name: 'United States', 
                    children:[
                        {name:'London',value: 1800},
                        {name:'Edingburgh',value:123},
                        {name:'Nottingham',value:500}
                    ]
                },
                {   name: 'Others', value: 2233}
            ]}
    }),
    // https://cn.vuejs.org/v2/api/#mounted
    mounted() {
        // 这里会在实例被挂载后调用
        // 初始化图表
        this.initTreeMap();
        // this.cal();
    },
    // https://cn.vuejs.org/v2/api/#computed
    // https://cn.vuejs.org/v2/guide/computed.html#%E5%9F%BA%E7%A1%80%E4%BE%8B%E5%AD%90
    computed: {
        // 这里是一些计算属性，当其中涉及的值发生变化时，计算属性会重新计算，返回新的值
        ascendingData(){ 
            // 升序排序
            return this.sortKeyAscending(this.originData,'value');
        },
        descendingData(){
            // 降序排序
            return this.sortKeyDescending(this.originData,'value');
        }
    },
    // https://cn.vuejs.org/v2/api/#watch
    watch: {
        // watch的作用可以监控一个值的变换，并调用因为变化需要执行的方法。可以通过watch动态改变关联的状态。
        // 这里是一些可被修改的配置项，例如图表标题内容、标题是否显示等
        'options.titleText': {
            handler(){
                this.titleText = this.options.titleText;
                this.title.select('text').text(this.titleText);
            }
        },
        'options.titleIsShow': {
            handler() {
                if(this.options.titleIsShow){
                    this.title.attr('style','display: block');
                }else{
                    this.title.attr('style','display: none');
                }
            }
        },
        'options.titleBackground': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('rect').attr('fill',`${this.options.titleBackground}`);
                }
            }
        },
        'options.titleFontColor': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('text').attr('fill',`${this.options.titleFontColor}`);
                }
            }
        },
        'options.titlePosition': {
            handler() {
                this.updateTitlePosition();
            }
        },
        'options.titleTextPosition': {
            handler() {
                this.updateTextPosition();
            }
        },
        'options.titleFontFamily': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('text').attr('font-family',`${this.options.titleFontFamily}`);
                }
            }
        },
        'options.titleFontSize': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('text').attr('font-size',`${this.options.titleFontSize}`);
                }
            }
        },

        'options.chartIsShow' :{
            handler(){
                if(this.options.chartIsShow){
                    this.chart.attr('style','display: block');
                }
                else{
                    this.chart.attr('style','display: none');
                }
            }
        },
        'options.chartBackground': {
            handler(){
                if(this.options.chartIsShow){
                    this.svg.attr('style',`background: ${this.options.chartBackground}`);
                }
            }
        },
        // 请根据组件需要补充...
    },
    // https://cn.vuejs.org/v2/api/#methods
    methods: {
        // 这里是一些组件其余地方会使用到的函数，调用方式为 this.xxxx()
        // 例如mounted中的图表初始化函数 initTreeMap() 就应该被定义在这里
        // 其余与交互、更新有关的函数也都写在这里
        initTreeMap() {
          // 在这里编写初始化图表的代码，以下代码仅供参考，均可调整
          // 可以使用d3绘制可视化图表，具体可参考 bar chart 示例和 README.md 中的链接
            // console.log(this.options);

            // 指定图表的宽高
            // this.width = 700 - this.chartPadding.right - this.chartPadding.left-180;
            // this.height = 700 -this.chartPadding.bottom - this.chartPadding.top-80;
            this.width = 1500;
            this.height = 1500;
            // console.log('width:',this.width, 'height:',this.height);

            d3.select('#tree-map-container')
                .style('width','1000px')
                .style('height','1000px');
          
            // 添加svg
            // this.svg = d3.select('#tree-map-container').append('svg')
            //             .attr('style','background: #ffdcb8')
            //             .attr('width',700)
            //             .attr('height',700);
            
            this.svg = d3.select('#tree-map-container').append('svg')
                        .attr('viewBox',[0,0,this.width,this.height + 30])
                        .style('font','sans-serif')
                        .attr('style','background: #eee');
                    //    .attr('width',700)
                    //    .attr('height',700);

            // 添加g标签 
            // g标签为svg常用的标签，用于把相关元素进行组合的容器元素
            this.g = this.svg.append('g')
                      .attr('class','chart')  // 图表部分
                      .attr('transform',`translate(${this.chartPadding.left+40}, ${this.chartPadding.top+40})`);

            this.rootH=d3.hierarchy(this.data)
                            .sum(d=>d.value)
                            .sort((a,b)=>b.value-a.value);
            
            this.root = d3.treemap(this.rootH).size([700,700])(this.rootH);
            
            this.leaf = this.svg.selectAll('g')
                .data(this.root.leaves())
                .join('g') 
                .attr('transform', d => `translate(${d.x0},${d.y0+100})`); // 每个方块的位置

            // 添加图表标题
            this.title = this.svg.append('g')
                          .attr('transform','translate(0,0)')
                          .attr('style','display: none');     // 默认不显示
            
            // 标题背景框
            this.title.append('rect')
                    .attr('class','title')
                    .attr('width', 700)
                    .attr('height',`${this.titleRectHeight}`)
                    .attr('fill','#E3E3E3')
                    .attr('x','0')
                    .attr('y','0');
            
            // 标题文本       
            this.title.append('text')
                    .text(this.titleText)
                    .attr('x',350)
                    .attr('y',25)
                    .attr('text-anchor','middle')
                    .attr('fill','#000');

            // 开始绘制树图
            this.color = d3.scaleOrdinal(d3.schemeCategory10);

            this.chart = d3.selectAll('#tree-map-container');

            // 当鼠标放在区域上时，会显示一个提示框
            this.leaf.append('title')
                .text(d => `${d.ancestors().reverse().map(child => child.data.name).join('/')}\n${d.value}`);

            this.leaf.append('rect')
                .attr('id', d => d.leafUid)
                .attr('fill', d => { let findFather=d;while (findFather.depth > 1)  findFather = findFather.parent; return this.color(findFather.data.name); })
                .attr('fill-opacity', 0.6)
                .attr('width',  d => d.x1 - d.x0)
                .attr('height', d => d.y1 - d.y0);
            
            this.leaf.append('clipPath')
                .attr('id', d=> d.clipUid )
                .append('use');
                // .attr('xlink:href', d => d.leafUid.href);

            this.text = this.leaf.append('text')
                .attr('x',3)
                .attr('y',3)
                .attr('font-size',12);
               
            this.text.selectAll('tspan') 
                .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(d.value)) 
                .enter() 
                .append('tspan') 
                .attr('x',this.text.attr('x')) 
                .attr('dy','1em') 
                .attr('fill-opacity', (d, i, nodes) => i === nodes.length - 1 ? 0.5 : null)
                .text(function(d){ 
                return d; 
                });
            
            // zoom in & zoom out
            this.x = d3.scaleLinear().rangeRound([0, this.width]);
            this.y = d3.scaleLinear().rangeRound([0, this.height]);
            
            this.group = this.svg.append('g')
                            .call(this.render, this.root);
            
        },
        position(group, root) {
            group.selectAll('g')
            // .attr('transform', d => d === root ? `translate(0,-30)` : `translate(${this.x(d.x0)},${this.y(d.y0)})`)
            .select('rect')
            .attr('width', d => d === root ? this.width : this.x(d.x1) - this.x(d.x0))
            .attr('height', d => d === root ? 30 : this.y(d.y1) - this.y(d.y0));
        },
        zoomin(d){
            console.log('zoomin starts');
            const group0 = this.group.attr('pointer-events','none');
            const group1 = this.group = this.svg.append('g').call(this.render,d);

            this.x.domain([d.x0,d.x1]);
            this.y.domain([d.y0,d.y1]);

            this.svg.transition()
                .duration(750)
                .call(t => group0.transition(t).remove()
                .call(this.position, d.parent))
                .call(t => group1.transition(t)
                .attrTween('opacity', () => d3.interpolate(0, 1))
                .call(this.position, d));
        },
        zoomout(d){
            console.log('zoomout starts');
            const group0 = this.group.attr('pointer-events', 'none');
            const group1 = this.group = this.svg.insert('g', '*').call(this.render, d.parent);

            this.x.domain([d.parent.x0, d.parent.x1]);
            this.y.domain([d.parent.y0, d.parent.y1]);

            this.svg.transition()
            .duration(750)
            .call(t => group0.transition(t).remove()
            .attrTween('opacity', () => d3.interpolate(1, 0))
            .call(this.position, d))
            .call(t => group1.transition(t)
            .call(this.position, d.parent));
        },
        name(d){
            return d.ancestors().reverse().map(x => x.data.name).join('/');
        },
        render(group, root){
            // name = d => d.ancestors().reverse().map(d => d.data.name).join("/");
            console.log('render starts');
            this.node = group
                .selectAll('g')
                .data(root.children.concat(root))
                .join('g');
            
            console.log('node:',this.node);

            this.node.filter(d => d === root ? d.parent : d.children)
                .attr('cursor', 'pointer')
                .on('click', function(){
                    console.log('click');
                    // if (d === root)  this.zoomout(root); else this.zoomin(d);
                    });
            console.log('render ends');


            // node.append('title')
            //     .text('pigpig');

            // node.append('rect')
            //     // .attr('id', d => {d.leafUid = 'leaf'+d.value;return d.leadUid.id;})
            //     .attr('fill', d => d === root ? '#fff' : d.children ? '#ccc' : '#ddd')
            //     .attr('stroke', '#fff');

            // node.append('clipPath')
            //     // .attr('id', d => {d.clipUid="clip"+d.value;return d.clipUid.id;})
            //     .append('use')
            //     .attr('xlink:href', d => d.leafUid.href);

            // node.append('text')
            //     .attr('clip-path', d => d.clipUid)
            //     .attr('font-weight', d => d === root ? 'bold' : null)
            // .selectAll('tspan')
            // .data(d => (d === root ? this.name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g).concat(d3.format(d.value)))
            // .join('tspan')
            //     .attr('x', 3)
            //     .attr('y', (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
            //     .attr('fill-opacity', (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            //     .attr('font-weight', (d, i, nodes) => i === nodes.length - 1 ? 'normal' : null)
            //     .text(d => d);

            // group.call(this.position, root);
        },
        updateTitlePosition() {
            if(this.options.titleIsShow){
                // 根据设置进行对应旋转和平移
                switch(this.options.titlePosition){
                    case 'top':     this.title.attr('transform','rotate(0) translate(0,0)');
                                    break;
                    case 'bottom':  this.title.attr('transform','rotate(0) translate(0,660)');
                                    break;
                    case 'left':    this.title.attr('transform','translate(0,700) rotate(270)');
                                    break;
                    case 'right':   this.title.attr('transform','translate(700,0) rotate(90)');
                                    break;
                    default: break;
                }
                    
            }
        },
        updateTextPosition(){
            if(this.options.titleIsShow){
                    // 修改text相对标题rect的位置,来更改文本对齐方式
                    switch(this.options.titleTextPosition){
                        case 'center':  this.title.select('text')
                                            .attr('text-anchor','middle')
                                            .attr('x',350);
                                        break;
                        case 'left':    this.title.select('text')
                                            .attr('text-anchor','start')
                                            .attr('x',10);
                                        break;
                        case 'right':   this.title.select('text')
                                            .attr('text-anchor','end')
                                            .attr('x',690);
                                        break;
                        default: break;
                    }
                    
                }
        }
    }

};
</script>
<style scoped>
text {
    background: '#000';
}
#tree-map-container {
    overflow: hidden;
}
</style>