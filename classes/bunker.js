class Bunker extends Sprite {
	constructor(x, y) { //needs x and y parameters in order to instansiate a new Bunker
		super(x, y); //initialize properties of mother class Sprite
		this.width = 100; //image width changed from default
		this.height = 40; //image width changed from default
		this.startHp = 5; //bunker start health set
		this.hp = this.startHp; //bunkers health is set to start health
	}

	display() {
		rectMode(CENTER);
		noStroke() //no stroke

		//flag
		fill('#d50100'); //red 
		if (this.hp >= 5) {
			rect(this.x + this.width / 3 / 2, this.y - 70, this.width / 3, this.height / 2);
		}

		//post
		fill('#5d25b2'); //purple
		if (this.hp >= 4) {
			rect(this.x, this.y - 45, this.width / 20, this.height * 2);
		}

		//roof
		fill('#71f200'); //green
		if (this.hp >= 3) {
			ellipse(this.x, this.y - this.height / 2, this.width, this.height);
		}

		//base of bunker
		if (this.hp >= 1) {
			rect(this.x, this.y, this.width, this.height);
		}

		//door
		fill('#5d25b2'); //purple
		if (this.hp >= 2) {
			ellipse(this.x, this.y, this.width / 6, this.height / 2);
			rect(this.x, this.y + 8, this.width / 6, this.height / 2);
		}
	}
}