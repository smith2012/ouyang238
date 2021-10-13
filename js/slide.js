/**
 * Created by Administrator on 2016/1/11 0011.
 */
var picX;
var savePicX;//������ʼ��¼X
var leavePicX;//�뿪��Ļ��¼X
var flag;
var rollBox=document.getElementById("rollTouch");
var pics=rollBox.getElementsByTagName("img");
var rollCells=rollBox.getElementsByTagName("li");
var rollIndexCells=document.getElementById("rollIndex").getElementsByTagName("li");
var body=document.getElementsByTagName("body");
var CellWidth=document.body.clientWidth;
//var CellWidth=rollBox.clientWidth;
var timer;
var indexNum=0;

function topSlide(){
    for (var j=0;j<pics.length;j++){
        pics[j].ondragstart=imgdragstart;//��ֹͼƬ����ק
        rollCells[j].value=j;
        rollCells[j].addEventListener("touchstart", handleStart, false);
        rollCells[j].addEventListener("touchend", handleEnd, false);
        rollCells[j].addEventListener("touchmove", handleMove, false);
    }
}

function handleMove(event){
    //evt.preventDefault();
    var current=event.currentTarget;
    //currentTarget���Է����¼���ǰ���ڵĽڵ㣬������ִ�еļ����������󶨵��Ǹ��ڵ㡣��Ϊ�Ƚϣ�target���Է����¼������Ľڵ㡣
    var touches = event.changedTouches;//���ڴ��������Ƕ��Ӵ�����������touches���ص���һ������

    var index=current.value;
    var indexLeft;
    var indexRight;
    if(index==0){
        indexLeft=rollCells.length-1;
        indexRight=index+1;
    }else if(index==(rollCells.length-1)){
        indexLeft=index-1;
        indexRight=0;
    }else{
        indexLeft=index-1;
        indexRight=index+1;
    }

    picX=touches[0].pageX;
        rollCells[index].style.left=(picX-savePicX)+"px";//�Ӵ�Ԫ�ص�λ��

    rollCells[indexLeft].style.left=(picX-savePicX)-CellWidth+"px";//���ڽӴ�Ԫ�����Ԫ�ص�λ��
        rollCells[indexRight].style.left=(picX-savePicX)+CellWidth+"px";//���ڽӴ�Ԫ���Ҳ��Ԫ�ص�λ��
}
function handleStart(event){
    var touches = event.changedTouches;
    flag=1;
    savePicX=touches[0].pageX;
    var current=event.currentTarget;
    var index=current.value;
    for(var i=0;i<pics.length;i++){
        rollCells[i].style.transition="none";//��ק��ʱ������ӳ�����Ϊ������transition
        rollCells[i].style.mozTransform="none";//��ק��ʱ������ӳ�����Ϊ������transition
    }
    Initialization(index);
    clearInterval(timer);
}
function handleEnd(event){
    flag=0;
    var touches = event.changedTouches;
    var current=event.currentTarget;
    var index=current.value;
    leavePicX=touches[0].pageX;
    for(var i=0;i<pics.length;i++){
        rollCells[i].style.transition="all 300ms ease";//��ק��ʱ������ӳ�����Ϊ������transition
        rollCells[i].style.mozTransform="all 300ms ease";//��ק��ʱ������ӳ�����Ϊ������transition
    }
    if((leavePicX-savePicX)<-60){ //ʵ�������ָ����Ļ�ϻ����������ָ�뿪��������������60px �ж�Ϊ��ҳ
        index=index+1;
        if(index>(rollCells.length-1)){
            index=0;
        }
    }else if((leavePicX-savePicX)>60){
        index=index-1;
        if(index<0){
            index=rollCells.length-1;
        }
    }else{
        index=index+0;
    }
    Initialization(index);
    indexNum=index;
    timer=setInterval(timerPosition,3000);

}
function  Initialization(index){
    var indexLeft;
    var indexRight;
    if(index==0){
         indexLeft=rollCells.length-1;
         indexRight=index+1;
    }else if(index==(rollCells.length-1)){
         indexLeft=index-1;
         indexRight=0;
    }else{
         indexLeft=index-1;
         indexRight=index+1;
    }

    for (var j=0;j<pics.length;j++){
        rollCells[j].style.zIndex=-1+"";
        rollCells[j].style.left=0+"px";
        rollIndexCells[j].className="";
    }
    rollIndexCells[index].className="on";
    rollCells[index].style.left=0+"px";
    rollCells[indexRight].style.left=CellWidth+"px";
    rollCells[indexLeft].style.left=0-CellWidth+"px";

    rollCells[index].style.zIndex=12+"";
    rollCells[indexRight].style.zIndex=11+"";
    rollCells[indexLeft].style.zIndex=11+"";

}
function timerPosition(){     //��ʱ���Զ���ҳ��������ֹͣ����֮��ʼ��
    Initialization(indexNum);
    if(indexNum==(rollCells.length-1)){
        indexNum=0;
    }else{
        indexNum++;
    }
}
timer=setInterval(timerPosition,3000);
Initialization(0);
topSlide();

