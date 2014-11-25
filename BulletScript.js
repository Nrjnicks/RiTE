
var bullets : Rigidbody;
var weapon :String;
var BulletMass :int=500;
var t:float = 5;
var Speed : int=50;

function Update(){
var CarControl : carControlweaponScript=GetComponent(carControlweaponScript);
var temp :float;
if(weapon==CarControl.Weapon)
if(Input.GetKeyDown(KeyCode.LeftAlt)&&CarControl.ammo>0){
clone = Instantiate(bullets,transform.position,transform.rotation);
temp=CarControl.cur/3+Speed;
clone.velocity=transform.TransformDirection(Vector3(0,0,temp));
CarControl.recoil=Speed*BulletMass/1500*2;
Destroy(clone.gameObject,t);
CarControl.ammo--;
}

}