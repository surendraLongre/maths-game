var time=5;
var score=0;
var play=$('#start-reset');

play.click(function () {
	if(play.text()=='Start Game') {play.text('Reset Game');
		time=60;
		distribute_random_num();
		$('#time').css('display', 'block');
		timer=setInterval(function(){
			time--;
			$('#time span').text(time);
			if(time==0) {clearInterval(timer);
				play.text('Start Game');
			}
		}, 1000);
	}

	else {play.text('Start Game'); 
		$('#time').css('display', 'none');
		$('#time span').text(60);
		clearInterval(timer);
	}
});

function distribute_random_num(){
	var x=random_num();
	var y=random_num();

	$('#question').text(`${x} x ${y}`);

	var ans_box=Math.floor(Math.random()*4)+1;
	console.log(ans_box);
	ans=x*y;
	$(`.answer:nth-child(${ans_box})`).text(ans);

	for(var i=1; i!=5; i++) {
		if(i==ans_box) continue;
		var choiceX=random_num();
		var choiceY=random_num();
		var choice_ans=choiceX*choiceY;
		if(choice_ans!=ans) $(`.answer:nth-child(${i})`).text(choice_ans);
		else i--;
	};
}


$('.answer').click(function(){
	if($(this).text()==ans && time!=0) {
		score++;
		$('#score-box span').text(score);
		distribute_random_num();
		show('.correct:nth-child(1)');
		hide('.correct:nth-child(2)');
	}
	else {
		show('.correct:nth-child(2)');
		hide('.correct:nth-child(1)');
	};
});

function random_num() {
	return Math.floor(Math.random()*50+1);

}

var ans_height= ($('.answer').height());
$('.answer').css('font-size', `${ans_height/2.6}px`);


function show(id){
	$(id).css('display', 'block');
	setTimeout(function(){
		hide(id);
	},1000);
};

function hide(id) {
	$(id).css('display','none');
}

var ques_height=$('#question').height();
$('#question').css('font-size', `${ques_height/3.6}px`);
