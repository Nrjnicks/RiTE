var Ado1:AudioSource;
var Ado2:AudioSource;
var Ado3:AudioSource;
var Ado4:AudioSource;
var Ado5:AudioSource;
var Ado6:AudioSource;
var Ado7:AudioSource;
var Ado8:AudioSource;
var frame:int;
var wait:int;
var songNo:int;
function Start (){
Ado1.minDistance=500;
Ado2.minDistance=500;
Ado3.minDistance=500;
Ado4.minDistance=500;
Ado5.minDistance=500;
Ado6.minDistance=500;
Ado7.minDistance=500;
Ado8.minDistance=500;


Ado1.Play();
wait= Ado1.clip.length*60;
songNo=1;
Ado2.Stop();
Ado3.Stop();
Ado4.Stop();
Ado5.Stop();
Ado6.Stop();
Ado7.Stop();
Ado8.Stop();
}

function Update () {
if(frame>0)
frame--;
if(wait>0)
wait--;
if(Input.GetKeyDown(KeyCode.N)&&Ado1.isPlaying&&frame==0||songNo==1&&wait==0){
frame=30;
wait= Ado2.clip.length*60;
songNo=2;
Ado1.Stop();
Ado2.Play();
}

if(Input.GetKeyDown(KeyCode.N)&&Ado2.isPlaying&&frame==0||songNo==2&&wait==0){
frame=30;
wait= Ado2.clip.length*60;
songNo=3;
Ado2.Stop();
Ado3.Play();
}
if(Input.GetKeyDown(KeyCode.N)&&Ado3.isPlaying&&frame==0||songNo==3&&wait==0){
frame=30;
wait= Ado3.clip.length*60;
songNo=4;
Ado3.Stop();
Ado4.Play();
}
if(Input.GetKeyDown(KeyCode.N)&&Ado4.isPlaying&&frame==0||songNo==4&&wait==0){
wait= Ado4.clip.length*60;
songNo=5;
frame=30;
Ado4.Stop();
Ado5.Play();
}
if(Input.GetKeyDown(KeyCode.N)&&Ado5.isPlaying&&frame==0||songNo==5&&wait==0){
wait= Ado5.clip.length*60;
songNo=6;
frame=30;
Ado5.Stop();
Ado6.Play();
}
if(Input.GetKeyDown(KeyCode.N)&&Ado6.isPlaying&&frame==0||songNo==6&&wait==0){
wait= Ado6.clip.length*60;
songNo=7;
frame=30;
Ado6.Stop();
Ado7.Play();
}

if(Input.GetKeyDown(KeyCode.N)&&Ado7.isPlaying&&frame==0||songNo==7&&wait==0){
wait= Ado7.clip.length*60;
songNo=8;
frame=30;
Ado7.Stop();
Ado8.Play();
}

if(Input.GetKeyDown(KeyCode.N)&&Ado8.isPlaying&&frame==0||songNo==8&&wait==0){
wait= Ado8.clip.length*60;
songNo=1;
frame=30;
Ado8.Stop();
Ado1.Play();
}

}