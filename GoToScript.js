#pragma strict
var SceneName :String;
function Start () {

}

function OnMouseDown () {
gameObject.transform.localScale.x=gameObject.transform.localScale.x-gameObject.transform.localScale.x/6;
gameObject.transform.localScale.y=gameObject.transform.localScale.y-gameObject.transform.localScale.y/6;
if(SceneName=="Q")
Application.Quit();
else{
Application.LoadLevel(SceneName);
gameObject.transform.localScale.x=gameObject.transform.localScale.x+gameObject.transform.localScale.x/6;
gameObject.transform.localScale.y=gameObject.transform.localScale.y+gameObject.transform.localScale.y/6;
}
}