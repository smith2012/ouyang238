/**
 * Created by Administrator on 2015/12/30 0030.
 */
window.onload=function(){
    heightMain();
    offAD();
    serchInterfaceAppear();
};
window.onresize=function(){
   heightMain();
};
window.onscroll=function(){
    searchChangeColor();
    //offAD();
};
function heightMain(){  //html��һЩԪ�صĳߴ��ȡ
    var rollBox=document.getElementById("roll");
    var rollTouch=document.getElementById("rollTouch");
    var screenWidth=document.getElementsByTagName("body")[0].clientWidth;//��ȡbody�Ŀ�
    var sreenheight;
    var HandSlideBox=document.getElementById("HandSlideBox");
    var HandSlideCellEnd=document.getElementById("HandSlideCellEnd");

    rollBox.style.height=Math.floor(screenWidth*350/720)+"px";
    rollTouch.style.width=screenWidth*8+"px";
    HandSlideBox.style.width=Math.floor(screenWidth*2/7)*20+HandSlideCellEnd.offsetWidth+"px";

    var serchInterface=document.getElementById("serchInterface");//�����������
    //��ȡ���ڸ߶�
    if (window.innerHeight){
        sreenheight = window.innerHeight;
    }else if((document.body) && (document.body.clientHeight)){
        sreenheight = document.body.clientHeight;
    }
    serchInterface.style.height=sreenheight+"px";

}

function offAD(){   //�رչ��ģ��
    var offADFlag=1;
    var Advertisement=document.getElementById("Advertisement");
    var ADOffBtn=Advertisement.getElementsByClassName("off")[0];
    var sTop=document.body.scrollTop||document.documentElement.scrollTop;
    ADOffBtn.onclick=function(){
        Advertisement.style.display="none";
        offADFlag=0;
    };
    window.addEventListener("scroll", function(){
        //console.log(document.body.scrollTop||document.documentElement.scrollTop);
        if((document.body.scrollTop||document.documentElement.scrollTop)==0){  //������ÿ���ƶ����˶��Թ���Ƿ��û��رս����ж���û�ز���ʾ
            if(offADFlag){
                Advertisement.style.display="block";
            }else{
                Advertisement.style.display="none";
            }
        }else{
            Advertisement.style.display="none";
        }
    }, false);

}

function searchChangeColor(){       //���������λ�ñ仯����͸����
    var searchBg=document.getElementById("searchBg");
    var nav=document.getElementById("nav");
    var header=document.getElementById("header");
    var changeScope=nav.offsetTop-header.offsetTop;
    var currentLocation=document.body.scrollTop||document.documentElement.scrollTop;
    if((changeScope-currentLocation)>0){
        searchBg.style.opacity=(1-((changeScope-currentLocation)/changeScope))+"";
        searchBg.style.mozOpacity=(1-((changeScope-currentLocation)/changeScope))+"";
    }else{
        searchBg.style.opacity="1";
        searchBg.style.mozOpacity="1";
    }
}


function serchInterfaceAppear(){               //�������������������
    var topSearchText=document.getElementById("topSearchText");
    var serchInterface=document.getElementById("serchInterface");//�����������
    var serchInterfaceText=document.getElementById("serchInterfaceText");
    var NonSerchInterface=document.getElementById("NonSerchInterface");//Ϊ�˽��overflowY��iPhone�²���������ӵĺ���
    topSearchText.onfocus=function(){

        serchInterface.style.display="block";
        NonSerchInterface.style.display="none";
        document.getElementsByTagName("body")[0].style.overflowY="hidden";
        serchInterfaceText.focus();
    };

    var serchInterfaceOffBtn=document.getElementById("serchInterfaceOffBtn");
        serchInterfaceOffBtn.onclick=function(){

        serchInterface.style.display="none";
            NonSerchInterface.style.display="block";
        document.getElementsByTagName("body")[0].style.overflowY="";

    };
}
