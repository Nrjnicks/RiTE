var frame :int;
var flag:int;
var largeFont :GUIStyle= new GUIStyle(); 
var pause : Texture2D;
function Start(){
frame=10;
flag=0;
}
function Update()
{
    if (Input.GetKey(KeyCode.Escape))
    {
            Application.Quit();
    }
    
    if (Input.GetKey(KeyCode.Backspace))
    {
        Application.LoadLevel("Menu");
    }
   
  if (Input.GetKey(KeyCode.P)&&frame==10)
    { 
    flag=1;
    
   if (Time.timeScale == 1.0){            
		    Time.timeScale = 0.0;    
		    AudioListener.volume=0;}   
		else{
		     Time.timeScale = 1.0;
		   AudioListener.volume=1.0;
		    }
	}
	if(flag==1)
	frame--;
	if(frame<0){
	frame=10;
	flag=0;}
}

function OnGUI(){
if(Time.timeScale==0){
GUI.DrawTexture(Rect(Screen.width/2-150,Screen.height/2-75,300,150),pause);
}
}