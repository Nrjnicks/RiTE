#pragma strict
var weaponName :String;
var defaultAmmo:int;
var weaponNo :int;
function Start () {


}

function Update () {

}
function OnTriggerStay (other : Collider){  
  
if (other.tag == "PCar")
{
if(weaponName=="Nitro"||weaponName=="Shield"||weaponName=="Spikes"||weaponName=="Health")
{
if(other.transform.root.GetComponent(carControlweaponScript).NWeapon == weaponName){

other.transform.root.GetComponent(carControlweaponScript).Nammo = other.transform.root.GetComponent(carControlweaponScript).Nammo + defaultAmmo;  
}
else{
other.transform.root.GetComponent(carControlweaponScript).NWeapon = weaponName;
other.transform.root.GetComponent(carControlweaponScript).Nammo = defaultAmmo;  

}
}
else{
if(other.transform.root.GetComponent(carControlweaponScript).Weapon == weaponName){

other.transform.root.GetComponent(carControlweaponScript).ammo = other.transform.root.GetComponent(carControlweaponScript).ammo + defaultAmmo;  
}
else{
other.transform.root.GetComponent(carControlweaponScript).Weapon = weaponName;
other.transform.root.GetComponent(carControlweaponScript).ammo = defaultAmmo;  

}
  }
Destroy(gameObject);
other.transform.root.GetComponent(AIWeaponisedCarScript).UsedWeapon[weaponNo] =1;
}
else{if (other.tag == "AICar")
{
if(weaponName=="Nitro"||weaponName=="Shield"||weaponName=="Spikes"||weaponName=="Health")
{
other.transform.root.GetComponent(AIWeaponisedCarScript).NWeapon = weaponName;
other.transform.root.GetComponent(AIWeaponisedCarScript).Nammo = other.transform.root.GetComponent(AIWeaponisedCarScript).Nammo + defaultAmmo;

}
else{
if(other.transform.root.GetComponent(AIWeaponisedCarScript).Weapon == weaponName){

other.transform.root.GetComponent(AIWeaponisedCarScript).ammo = other.transform.root.GetComponent(AIWeaponisedCarScript).ammo + defaultAmmo;  
}
else{
other.transform.root.GetComponent(AIWeaponisedCarScript).Weapon = weaponName;
other.transform.root.GetComponent(AIWeaponisedCarScript).ammo = defaultAmmo;  

}
  }

Destroy(gameObject);
other.transform.root.GetComponent(AIWeaponisedCarScript).UsedWeapon[weaponNo] =1;
}
}
  }