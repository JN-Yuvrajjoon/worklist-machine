class dayBlockSet{
	constructor() {
	  this.sunday = false;
	  this.monday = false;
	  this.tuesday = false;
	  this.wednesday = false;
	  this.thursday = false;
	  this.friday = false;
	  this.saturday = false;
	}
  }
  
  class dayBools{
	constructor() {
	  this.sunday = false;
	  this.monday = false;
	  this.tuesday = false;
	  this.wednesday = false;
	  this.thursday = false;
	  this.friday = false;
	  this.saturday = false;
	}
  }
  
  let monWedFri = new dayBlockSet();
  monWedFri.sunday= false;
  monWedFri.monday= [{}];
  monWedFri.tuesday= false;
  monWedFri.wednesday= [{}];
  monWedFri.thursday= false;
  monWedFri.friday= [{"g": "whatg"}];
  monWedFri.saturday= false;
  
  
  let tueThuFri = new dayBlockSet();
  tueThuFri.sunday= false;
  tueThuFri.monday= false;
  tueThuFri.tuesday= [{}];
  tueThuFri.wednesday= false;
  tueThuFri.thursday= [{}];
  tueThuFri.friday= [{"e": "what"}];
  tueThuFri.saturday= false;
  
  
  function daywiseAnd(set1, set2) {
	result = new dayBools();
	result.sunday = set1.sunday && set2.sunday;
	result.monday = set1.monday && set2.monday;
	result.tuesday = set1.tuesday && set2.tuesday;
	result.wednesday = set1.wednesday && set2.wednesday;
	result.thursday = set1.thursday && set2.thursday;
	result.friday = set1.friday && set2.friday;
	result.saturday = set1.saturday && set2.saturday;
  
	return result;
  }
  
  
  console.log(daywiseAnd(monWedFri, tueThuFri));
  