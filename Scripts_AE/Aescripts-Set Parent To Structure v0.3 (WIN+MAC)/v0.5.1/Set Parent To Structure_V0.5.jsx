//20211218邱志伟自动设置父子链接0.4
//app.project.item(index).layer(index).property("Marker").keyValue(index).setParameters(keyValuePairs)

function qzwScript(thisObj)
{

    //构建UI
    function qzwBuildUI(thisObj){
        var qzwUiPal = (thisObj instanceof Panel) ? thisObj : new Window("palette","Set Parent To Structure_V0.3", undefined, {resizeable:true});
        if (qzwUiPal != null) {
            // var res = "group { "
                            // + "orientation:'column',alignment:['fill','fill'],"
                            // + "qzwListBox: ListBox { alignment:['fill','fill'], properties:{items:" + "['重名1','重名2','重名3']" + "} },"
            //                 + "qzwButGro: Group {alignment:['fill','bottom'],"
            //                                 + "qzwBut1: Button { text:'按钮A', alignment:['fill','center'], helpTip : '提示1' },"
            //                                 + "qzwBut2: Button { text:'按钮B', alignment:['fill','center'], helpTip : '提示2' },"
                                            // + "},"
                        // +"}";


            var res = "group { "
                            + "orientation:'column',alignment:['fill','fill'],"
                            +"qzwTex: EditText { text:'50', alignment:['fill','center'] , helpTip : 'Set the size of the circle  设置骨骼的容差圈圈大小' },"
                            +"qzwBut1: Button { text:'Tolerance | 设置容差', alignment:['fill','center'], helpTip : 'Select Bone layers and click  选中骨骼图层以后点击' },"
                            +"qzwBut2: Button { text:'Parent Link | 父子链接', alignment:['fill','center'], helpTip : 'Select all Bone layers and non-Bone layers and click to automatically parent link  选中所有的骨骼图层和非骨骼图层，点击以后自动父子链接' },"
                            +"qzwBut3: Button { text:'Unlink | 断开链接', alignment:['fill','center'], helpTip : 'Only break the parent link of non-skeleton layers  只会断开非骨骼图层的父子链接' },"
                            +"qzwBut4: Button { text:'Tutorial | 教程', alignment:['fill','center'], helpTip : 'Bilibili portal, if you have any suggestions or want to optimize this script, you can add me to wechat 1138147148  哔哩哔哩传送门，如果你有好的建议或者想优化这个脚本，可以加我微信1138147148' },"
                            // +"qzwButTest: Button { text:'测试按钮', alignment:['fill','center']},"   //测试
                        +"}";
            
            qzwUiPal.qzwGrp = qzwUiPal.add(res);//重要！！！载入资源 
            qzwUiPal.layout.layout(true);//实时调整各个按钮的fill
            qzwUiPal.layout.resize();
            qzwUiPal.onResizing = qzwUiPal.onResize = function () {this.layout.resize();}
           // qzwUiPal.qzwGrp.qzwListBox.preferredSize.height = 300;
           //listBox的初始高度
            

            //当某个按钮被点击时，调用什么函数
            qzwUiPal.qzwGrp.qzwBut1.onClick = qzwSetSize;
            qzwUiPal.qzwGrp.qzwBut2.onClick = qzwLink;
            qzwUiPal.qzwGrp.qzwBut3.onClick = qzwBrake;
            qzwUiPal.qzwGrp.qzwBut4.onClick = qzwTutorial;
            
            // qzwUiPal.qzwGrp.qzwButTest.onClick = test1; //测试按钮


            //声明变量in
                var thisComp,sl;

                //alert提示，准备用于中英文转化
                var alNoCam = "No Comp is activated，没有激活任何合成";
                var alNoLay = "No Layers are selected，没有选中图层";


                //UndoGroup可撤销动作，准备用于中英文转化
                var groupSetTol = "Set Tolerance Size，设置容差大小"
                var groupParentLink = "Parent Link，父子链接"
                var gropUnlink = "Unlink，断开链接"







            //声明变量end


        //------------------------功能-----------------------
        //------------------------功能-----------------------
        //------------------------功能-----------------------

            function selLayer(){
                thisComp=app.project.activeItem;
                if(!(thisComp instanceof CompItem)){
                    alert("No Comp is activated");
                    return false;
                }else if(thisComp.selectedLayers.length<1){
                    alert("No Layers are selected");
                    return false;
                }else{
                    sl=thisComp.selectedLayers;
                    return true;
                }
            }

            function BoneType(i){
                if(sl[i].comment == "|Structures| "){//如果注释里有"|Structures| "
                    return "duik16";//是duik16
                }
                
                if (sl[i].property("Marker").numKeys > 0  ){//如果marker数量大于0
                    if("duik.boneIndex" in sl[i].property("Marker").keyValue(1).getParameters()){//如果marker里有duik.boneIndex参数
                        return "duik17";//是duik17
                    }
                }
                return "";
            }




        //------------------------按下按钮时-----------------------
        //------------------------按下按钮时-----------------------
        //------------------------按下按钮时-----------------------

            function test1(){
                app.beginUndoGroup("测试");
                thisComp=app.project.activeItem;

                // if(selLayer() == true){
                //     for(i = 0; i < sl.length;i++){
                //         alert("开始")
                //         if ("duik.boneIndex" in sl[i].property("Marker").keyValue(1).getParameters()){//寻找骨架
                //             alert("在里面")
                //         }else alert("不在")  
                //     }
                // }

                // if(selLayer() == true){
                //     for(i = 0; i < sl.length;i++){
                //         if (sl[i].property("Marker").numKeys > 0  ){
                //             alert(sl[i].property("Marker").numKeys)
                //         }else alert("不存在")
                //     }
                // }

                BoneType();

                app.endUndoGroup();
            }




            function qzwSetSize(){//当按下tolerance按钮,执行这个函数
                app.beginUndoGroup(groupSetTol);
                thisComp=app.project.activeItem;
                if (selLayer() == true){
                    qzwSizeText = qzwUiPal.qzwGrp.qzwTex.text;
                    for(var i=0;i<sl.length;i++){
                        if (BoneType(i) == "duik16"){
                            sl[i]('ADBE Root Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Shape - Ellipse')('ADBE Vector Ellipse Size').setValue([qzwSizeText,qzwSizeText]);
                        }else if(BoneType(i) == "duik17"){
                            sl[i] ('ADBE Root Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Graphic - Fill')('ADBE Vector Fill Opacity').setValue(30);
                            sl[i]('ADBE Root Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Shape - Ellipse')('ADBE Vector Ellipse Size').setValue([qzwSizeText,qzwSizeText]);}
                        else{
                            qzwTip = sl[i].name + "|is not structure";
                            // alert(qzwTip);
                        }
                    }
                }
                app.endUndoGroup();
            }
            



            function qzwLink(){
                app.beginUndoGroup(groupParentLink);
                thisComp=app.project.activeItem;
                var qzwObj = {};
                if(selLayer() == true){
                    for(i = 0; i < sl.length;i++){
                        if (BoneType(i) == "duik16" || BoneType(i) == "duik17"){//如果选中的图层是骨架
                            var par = sl[i].parent;
                            sl[i].parent = null;//断开父子
                            var qzwPosi = sl[i].position.value; //获取位置
                            //cySize = 比例*0.01*大小
                            var cySize = sl[i]('ADBE Root Vectors Group')('ADBE Vector Group')('ADBE Vector Transform Group')('ADBE Vector Scale').value[0]*0.01*sl[i]('ADBE Root Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Group')('ADBE Vectors Group')('ADBE Vector Shape - Ellipse')('ADBE Vector Ellipse Size').value[0]
                            var cyXmin = qzwPosi[0]-cySize*0.5;
                            var cyXmax = qzwPosi[0]+cySize*0.5;
                            var cyYmin = qzwPosi[1]-cySize*0.5;
                            var cyYmax = qzwPosi[1]+cySize*0.5;
                            var cyObj = [cyXmin,cyXmax,cyYmin,cyYmax];
                            qzwObj[sl[i].name] = cyObj;//{layerName:[cyXmin,cyXmax,cyYmin,cyYmax]}
                            sl[i].parent = par; //重新链接父子
                        }
                    }

                    for(a = 0; a < sl.length;a++){
                        if (BoneType(a) == ""){//如果选中的图层不是骨架
                            sl[a].parent = null;//断开父子
                            for (k in qzwObj){
                                qzwAcp = sl[a].position.value;

                                //var ts = "X"+qzwObj[k][0]+"!"+ qzwObj[k][1]+"Y"+qzwObj[k][2]+"!"+qzwObj[k][3];

                                var Xboo = qzwObj[k][0]<qzwAcp[0] && qzwAcp[0]<qzwObj[k][1];
                                var Yboo = qzwObj[k][2]<qzwAcp[1] && qzwAcp[1]<qzwObj[k][3];
                                if( Xboo && Yboo ){
                                    sl[a].parent = thisComp.layer(k);
                                }
                            }
                        }
                    }
                }
                app.endUndoGroup();
            }


            function qzwBrake(){
                // selLayer();
                app.beginUndoGroup(gropUnlink);

                thisComp=app.project.activeItem;
                if(selLayer() == true){
                    for(i = 0; i < sl.length;i++){
                        if (BoneType(i) == "" ){
                            sl[i].parent = null;//断开父子
                        }
                    }
                }
                app.endUndoGroup();
            }
            

            function qzwTutorial(){
                url="https://www.bilibili.com/video/BV19F411q7N6?spm_id_from=333.999.0.0";
                ProgramFiles = Folder.commonFiles.parent.fsName;
                BrowserCmd = ProgramFiles +"\\Internet Explorer\\iexplore.exe";
                system.callSystem("cmd /c \""+BrowserCmd + "\" " + url);
            }


        }
        return qzwUiPal;
    }
    // 主要代码：调出UI界面
    qzwBuildUI(thisObj);
}
qzwScript(this);
