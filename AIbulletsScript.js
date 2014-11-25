
var bullets : Rigidbody;
var weapon :String;
var BulletMass :int=500;
var t:float = 5;
var Speed : int=50;
var NoOfAmmoPerSec : int=3;
var ftm :int=0;

function Update(){
var AICarControl : AIWeaponisedCarScript=GetComponent(AIWeaponisedCarScript);
var temp :float;
if(weapon==AICarControl.Weapon){
ftm++;
if(ftm%(60/NoOfAmmoPerSec)==0)
ftm=0;
if(AICarControl.fire==1&&AICarControl.ammo>0&&ftm==0){
clone = Instantiate(bullets,transform.position,transform.rotation);
temp=AICarControl.cur/3+Speed;
clone.velocity=transform.TransformDirection(Vector3(0,0,temp));
AICarControl.recoil=Speed*BulletMass/1500*2;
Destroy(clone.gameObject,t);
AICarControl.ammo--;
AICarControl.fire=0;

}
}
}