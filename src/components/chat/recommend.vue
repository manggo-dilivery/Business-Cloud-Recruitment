<template>
    <div class="recommend">
        <topNav title="推荐" style="z-index: 10"></topNav>
        <div style="height:41px"></div>
        <div id="photo_box">
            <div><div>
            </div></div>
        </div>
        <div class="option">
            <img id="a2" style="border-radius: 50%" src="@/static/image/chat/a2.png" alt="">
            <img id="a1" src="@/static/image/chat/a1.png" alt="">
        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "recommend",
        data() {
            return {
                page: [
                    {src: require('@/static/image/others/1.jpg')},
                    {src: require('@/static/image/others/2.jpg')},
                    {src: require('@/static/image/others/3.jpg')},
                    {src: require('@/static/image/others/1.jpg')},
                    {src: require('@/static/image/others/2.jpg')},
                ],
            }
        },
        mounted(){
            var $ = this._$;
            let ip = this.imageUri;
            var photoSwipe={
                /*用户信息数组*/
                imgArr:[],
                /*元素位置*/
                site:{
                    _x_start:0,
                    _y_start:0,
                    _x_move:0,
                    _y_move:0,
                    _x_end:0,
                    _y_end:0,
                    top_val:0,
                    left_val:0,
                    isDown:0,
                    isDown2:0,
                    list:[]
                },
                /*当前下标*/
                index:0,
                /*是否允许动画*/
                run:true,
                /*是否加载完成*/
                load:false,
                /*初始化*/
                init:function () {
                    document.querySelector("#photo_box>div>div").innerHTML=this.imgHtml();
                },
                /*图片HTML*/
                imgHtml:function () {
                    var index = this.index;
                    var list = this.list;
                    // console.log(list)
                    var str=`<div id="ind-${index}" style="border:1px solid #eee;width:330px;top:60px;left:50%;margin-left:-165px;cursor:pointer;border-radius:10px;
                        box-shadow:0 0 10px #eee;position: absolute;background: #fff;margin-bottom:110px;padding-bottom:20px;">`
                        +`<img style='position: absolute;top:0;width:100%;height:100px;display:block;border-radius:10px;filter:blur(10px)' src='${ip}/business/image?image=${list[index].portrait}'>`
                        +`<img style='width:50px;height:50px;position:absolute;top:30px;left:50%;margin-left:-25px;' src='${ip}/business/image?image=${list[index].portrait}'>`
                            +'<div style="margin-top:110px;">'
                                +'<p style="width:90%;margin:0 auto;font-size:15px;padding:5px 0;border-bottom:1px solid #eee">目标</p>'
                                +'<div style="width:90%;margin:0 auto;display:flex;margin-top:10px;flex-wrap: wrap">'
                                     +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                     +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                     +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                +'</div>'
                            +'</div>'
                            +'<div style="margin-top:10px;">'
                                +'<p style="width:90%;margin:0 auto;font-size:15px;padding:5px 0;border-bottom:1px solid #eee">感兴趣话题</p>'
                                +'<div style="width:90%;margin:0 auto;display:flex;margin-top:10px;flex-wrap: wrap">'
                                    +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                    +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                    +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                +'</div>'
                            +'</div>'
                            +'<div style="margin-top:10px;">'
                                +'<p style="width:90%;margin:0 auto;font-size:15px;padding:5px 0;border-bottom:1px solid #eee">所在行业</p>'
                                +'<div style="width:90%;margin:0 auto;display:flex;margin-top:10px;flex-wrap: wrap">'
                                    +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                    +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                    +'<p style="font-size:11px;padding:3px 10px;background:#eee;border-radius:4px;border:1px solid #ddd;margin:5px 10px;">生活服务</p>'
                                +'</div>'
                            +'</div>'
                            +'<div style="margin-top:10px;">'
                                +'<p style="width:90%;margin:0 auto;font-size:15px;padding:5px 0;border-bottom:1px solid #eee">工作经历</p>'
                                +'<div style="width:90%;margin:0 auto;margin-top:10px;">'
                                    +'<p style="font-size:14px;margin:5px 0;font-weight:bold;color:#666">杭州阿里巴巴有限公司</p>'
                                    +'<p style="font-size:10px;color:#888">2010-至今 运营总监</p>'
                                    +'<p style="font-size:10px;color:#888">工作内容/方向 互联网电商</p>'
                                +'</div>'
                            +'</div>'
                            +'<div style="margin-top:10px;">'
                                +'<p style="width:90%;margin:0 auto;font-size:15px;padding:5px 0;border-bottom:1px solid #eee">教育经历</p>'
                                +'<div style="width:90%;margin:0 auto;margin-top:10px;display:flex;">'
                                    +'<img style="width:50px;height:50px;border-radius:50%;" src="http://52.69.229.171/business/image?image=201901240839055942.png">'
                                    +'<div style="margin-left:10px;">'
                                        +'<p style="font-size:14px;margin:5px 0;font-weight:bold;color:#666">南京大学</p>'
                                        +'<p style="font-size:10px;color:#888">2012/9-2015/6 研究生</p>'
                                        +'<p style="font-size:10px;color:#888">专业广告学</p>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                        +'</div>';
                    return str;
                },
                /*移动动画*/
                animateMove:function (el,val) {
                    if(!this.run){
                        return;
                    }
                    this.run=false;

                    /*CSS3动画方式*/
                    el.css({"transform":"translate3d("+doc_width*val+"px,"+photoSwipe.top_val*2.2+"px,0px)","transition-duration":"0.3s"});
                    var moveTime=setTimeout(function () {
                        el.remove();
                        var ind_el=$("#ind-"+(photoSwipe.index));
                        photoSwipe.activeEl(ind_el);
                        photoSwipe.index++;
                        $("#photo_box>div>div").append(photoSwipe.imgHtml());
                        photoSwipe.run=true;
                    },300);
                },
                /*复位动画*/
                animateReset:function (el) {
                    /*CSS3动画方式*/
                    el.css({"transform":"translate3d(0px,0px,0px)","transition-duration":"0.3s"});
                    var resetTime=setTimeout(function () {
                        el.css("transition-duration","0s");
                    },1000);
                },
                /*激活层*/
                activeEl:function (el) {
                    el.css("z-index","2");
                },
                /*清除位置*/
                clearLocation:function () {
                    this.left_val=0;
                }

            };
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'))
            var doc_width=$(document).width(),doc_height=$(document).height();
            this.$axios.get('/business/recommend/user/'+userInfo.uid+'/type/1?page=1&size=10').then(res=>{
                console.log(res)
                photoSwipe.list = res.data.data.list;
                photoSwipe.init();
                photoSwipe.activeEl($("#ind-0"));
                photoSwipe.index++;
                $("#photo_box>div>div").append(photoSwipe.imgHtml());
            })

            $("#photo_box").on("touchstart",function(e) {
                if(!photoSwipe.load || !photoSwipe.run){
                    return;
                }
                var ev = e || window.event;
                photoSwipe._x_start=ev.touches[0].pageX;
                photoSwipe._y_start=ev.touches[0].pageY;
                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
            });
            $("#photo_box").on("mousedown",function(e) {
                if(!photoSwipe.load || !photoSwipe.run){
                    return;
                }
                var ev = e || window.event;
                photoSwipe._x_start=ev.pageX;
                photoSwipe._y_start=ev.pageY;
                photoSwipe.isDown=1;
                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
            });
            $("#photo_box").on("touchmove",function(e) {
                if(!photoSwipe.load || !photoSwipe.run){
                    return;
                }
                var ev = e || window.event;
                photoSwipe._x_move=ev.touches[0].pageX;
                photoSwipe._y_move=ev.touches[0].pageY;

                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
                // photoSwipe.top_val=parseFloat(photoSwipe._y_move)-parseFloat(photoSwipe._y_start);
                photoSwipe.left_val=parseFloat(photoSwipe._x_move)-parseFloat(photoSwipe._x_start);
                // console.log(photoSwipe.left_val)
                act_el.css({"transform":"translateX("+photoSwipe.left_val+"px)","transition-duration":"0s"});
            });
            $("#photo_box").on("mousemove",function(e) {
                if(!photoSwipe.load || !photoSwipe.run){
                    return;
                }
                if(photoSwipe.isDown===1){
                    var ev = e || window.event;
                    photoSwipe._x_move=ev.pageX;
                    photoSwipe._y_move=ev.pageY;

                    var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
                    photoSwipe.top_val=parseFloat(photoSwipe._y_move)-parseFloat(photoSwipe._y_start);
                    photoSwipe.left_val=parseFloat(photoSwipe._x_move)-parseFloat(photoSwipe._x_start);

                    act_el.css({"transform":"translate3d("+photoSwipe.left_val+"px,"+photoSwipe.top_val+"px,0px)","transition-duration":"0s"});
                    // photoSwipe.isDown=0
                }

            });
            let that = this;
            $("#photo_box").on("touchend",function(e) {
                if(!photoSwipe.load || !photoSwipe.run){
                    return;
                }
                var ev = e || window.event;
                console.log('ev',ev.changedTouches[0].pageX)
                photoSwipe._x_end=ev.changedTouches[0].pageX;
                photoSwipe._y_end=ev.changedTouches[0].pageY;
                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
                // console.log(xchange)
                // console.log('act_el',act_el)
                if(photoSwipe.left_val>100&&-50<photoSwipe.top_val<50){
                    that.toast()
                    photoSwipe.animateMove(act_el,1);
                }else if(photoSwipe.left_val<-100&&-50<photoSwipe.top_val<50){
                    that.toast2()
                    photoSwipe.animateMove(act_el,-1);
                }else {
                    photoSwipe.animateReset(act_el);
                }
            });
            $("#photo_box").on("mouseleave",function(e) {
                if(!photoSwipe.load || !photoSwipe.run){
                    return;
                }
                var ev = e || window.event;
                console.log('ev',ev.pageX)
                photoSwipe._x_end=ev.pageX;
                photoSwipe._y_end=ev.pageY;
                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
                console.log('act_el',act_el)
                if(photoSwipe.left_val>0 && photoSwipe.left_val>50){
                    photoSwipe.isDown=0;
                    photoSwipe.animateMove(act_el,1);
                }else if(photoSwipe.left_val<0 && photoSwipe.left_val<-50){
                    photoSwipe.isDown=0;
                    photoSwipe.animateMove(act_el,-1);
                }else {
                    photoSwipe.isDown=0;
                    photoSwipe.animateReset(act_el);
                }
            });
            $("#a1").on("click",function (e) {
                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
                act_el.css({"transform":"translateX(200px)","transition-duration":"0s"});
                photoSwipe.animateMove(act_el,1);
            })
            $("#a2").on("click",function () {
                var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
                act_el.css({"transform":"translateX(-200px)","transition-duration":"0s"});
                photoSwipe.animateMove(act_el,-1);
            })
            $(function () {
                photoSwipe.load=true;
            });
        },
        methods:{
            toast(){
                Toast({
                    message: '收藏成功',
                    duration: 500
                });
                console.log('2323423')
            },
            toast2(){
                Toast({
                    message: '取消成功',
                    duration: 500
                });
                console.log('2323423')
            }
        }

    }



</script>

<style scoped>
    .option{
        position: fixed;
        top:550px;
        left:50%;
        margin-left:-60px;
        z-index:10
    }
    .option img{
        height: 50px;
        width: 50px;
    }
    #a1{
        margin-left:20px;
    }
    .div1{
        padding-top: 9rem;
        font-size: 6rem;
    }
    .recommend{
        width: 100%;
        height: 100%;
    }
    .stack {
        width: 100%;
        height: 100%;
        position: relative;
        perspective: 1000px; //子元素视距
    perspective-origin: 50% 150%; //子元素透视位置
    -webkit-perspective: 1000px;
        -webkit-perspective-origin: 50% 150%;
        margin: 0;
        padding: 0;
    }
    .stack-item{
        background: #fff;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        text-align: center;
        overflow: hidden;
        position: absolute;
    }
    .stack-item img {
        width: 100%;
        /*height: 100%;*/
        display: block;
        pointer-events: none;
    }
</style>
