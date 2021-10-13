/**
 * Created by Administrator on 2016/1/18 0018.
 */
function HandSlide(){
    var HandSlideBox=document.getElementById("HandSlideBox");
    var picX;
    var HSSavePicX;//������ʼ��¼X
    var HSLeavePicX;//�뿪��Ļ��¼X
    var HandSlideContainer=document.getElementById("HandSlideContainer");

    HandSlideBox.addEventListener("touchstart", HandSlideStart, false);
    HandSlideBox.addEventListener("touchend", HandSlideEnd, false);
    HandSlideBox.addEventListener("touchmove", HandSlideMove, false);
    function HandSlideStart(event){         //�ڴ������ϻ�����Ԫ��ʱ����
        var touches = event.changedTouches;
        HSSavePicX=touches[0].pageX;
        HandSlideBox.style.transition="none";//��ק��ʱ������ӳ�����Ϊ������transition

    }

    function HandSlideEnd(event){           //�ڴ������Ͻ���������Ԫ��ʱ����
        var touches = event.changedTouches;
        var HandSlideBoxLeft=HandSlideBox.offsetLeft;
        var cellWidth=HandSlideBox.getElementsByTagName("li")[0].offsetWidth;
        var HandSlideContainerWidth=HandSlideContainer.offsetWidth;
        var HandSlideBoxWidth=HandSlideBox.offsetWidth;
        var num;
        HSLeavePicX=touches[0].pageX;       //����������Ļ���Ͻ�Ϊԭ�㣬������Ԫ�����ݵ����Ͻ�
        HandSlideBox.style.transition="all 300ms ease";//��ק��ʱ������ӳ�����Ϊ������transition
        if(HandSlideBoxLeft<0){//�ж��Ƿ�������
            currentPosition=currentPosition+HSLeavePicX-HSSavePicX;//ʵ�ָ�������ԭ���Ŀ��
            if(currentPosition<-(HandSlideBoxWidth-HandSlideContainerWidth)){//�ж��Ƿ񻮳�ul��Χ
                currentPosition=-(HandSlideBoxWidth-HandSlideContainerWidth);
                HandSlideBox.style.left=currentPosition+"px";//����ul��Χ,ʵ�ֻص�Ч��
                window.location.href="http://www.baidu.com";//�ƶ�����ָ����������ת����ҳ��(�ڵ�ǰ�����д�)
                //window.open("http://www.baidu.com");//�ƶ�����ָ����������ת����ҳ��(���´����д�)
            }
            num=Math.ceil(-currentPosition/cellWidth);
            if((HSLeavePicX-HSSavePicX)<=0){ //�ж��Ƿ�������
                adjustment(num);
            }else{
                num=num-1;
                adjustment(num);
            }
        }

    }

    var currentPosition=0;
    function HandSlideMove(event){             //�ڴ��������ƶ���Ԫ��ʱ����
        var touches = event.changedTouches;    //���ڴ��������Ƕ��Ӵ�����������touches���ص���һ������
        var HandSlideBoxLeft=HandSlideBox.offsetLeft;
        picX=touches[0].pageX;
        if(!(HandSlideBoxLeft>=0&&((picX-HSSavePicX)>=0))){
            HandSlideBox.style.left=(picX-HSSavePicX)+currentPosition+"px";
        }
    }

    function adjustment(index){                  //���ݻ�����λ�ã�������Ӧ���ƶ��ľ���
        var cellWidth=HandSlideBox.getElementsByTagName("li")[0].offsetWidth;
        currentPosition=-index*cellWidth;
        HandSlideBox.style.left=currentPosition+"px";
    }
}
HandSlide();