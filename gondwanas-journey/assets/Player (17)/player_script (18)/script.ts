
//Sup.ArcadePhysics2D.setGravity(0, -0.0025);

enum Player_State
{
	Human,
	Bird
}

class Player_scriptBehavior extends Sup.Behavior
{
	isDead = false;
	jumpForce = 0.06;
	energy = 0.0;
	maxEnergy = 100.0;
	energyRefillRate = 1;
	energyDepleteRate = 0.2;
	state : Player_State = Player_State.Human;
	lastTimeTouch = 0;
	timeTransformThreshold = 300;
	lastTimeFlap = 0;
	timeFlapThreshold = 150;

	private wasOnGround = false;
	private humanSprite = "Player/player_human_sprite";
	private birdSprite = "Player/player_bird_sprite";

	awake()
	{
		this.actor.arcadeBody2D.setCustomGravity(0, -0.0025);
		
		this.energy = this.maxEnergy / 2;
	}

	addEnergy(amount : number)
	{
		this.energy += amount;
		
		if(this.energy > this.maxEnergy)
		{
			this.energy = this.maxEnergy;
		}
	}

	kill()
	{
		if(this.isDead)
		{
			return;
		}
		
		Sup.getActor("World").getBehavior(World_scriptBehavior).gameOver();
		
		Sup.Audio.playSound("sfx/magic", 0.5, { pitch: 0.5, pan: 0, loop: false });

		this.isDead = true;
		this.actor.spriteRenderer.setAnimation("die", false);
	}

	checkInput() : boolean
	{
		if(Sup.Input.wasTouchStarted(0) || Sup.Input.wasMouseButtonJustPressed(0))
		{
			return true;
		}
		
		return false;
	}

	changeState(state : Player_State)
	{
		if(this.state == Player_State.Human && state == Player_State.Bird)
		{
			this.actor.arcadeBody2D.setVelocity(0, this.jumpForce);
		}
		
		if(this.state != state)
		{
			let actor = Sup.appendScene("Player/Smoke");
			actor[0].setPosition(this.actor.getPosition().x, this.actor.getPosition().y, 1);
		}

		this.state = state;
		
		if(this.state == Player_State.Human)
		{
			this.actor.spriteRenderer.setSprite(this.humanSprite);
			this.actor.spriteRenderer.setAnimation("run");
		}
		else
		{
			this.actor.spriteRenderer.setSprite(this.birdSprite);
			this.actor.spriteRenderer.setAnimation("run");
		}
	}

	handlePhysicsHuman()
	{
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Ceiling").arcadeBody2D);
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Ground").arcadeBody2D);
		//Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

		let velocity = this.actor.arcadeBody2D.getVelocity();
		let isInGround = (this.actor.arcadeBody2D.getTouches().bottom && Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, Sup.getActor("Ground").arcadeBody2D));
		
		if (isInGround)
		{
			if(! this.wasOnGround)
			{
				Sup.Audio.playSound("sfx/impact", 0.5, { pitch: 0, pan: 0, loop: false });
				this.wasOnGround = true;
			}

			if (this.checkInput())
			{
				Sup.Audio.playSound("sfx/impact", 0.5, { pitch: 1, pan: 0, loop: false });
				
				this.wasOnGround = false;
				
				velocity.y = this.jumpForce * 1.1;
				this.actor.spriteRenderer.setAnimation("jump");
			}
			else
			{
				this.actor.spriteRenderer.setAnimation("run");
			}
		}
		else
		{
			if (velocity.y >= 0)
			{
				this.actor.spriteRenderer.setAnimation("jump");
			}
			else
			{
				this.actor.spriteRenderer.setAnimation("fall");
			}
		}

		this.actor.arcadeBody2D.setVelocity(velocity);
	}

	handlePhysicsBird()
	{
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Ceiling").arcadeBody2D);
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Ground").arcadeBody2D);
		//Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

		let velocity = this.actor.arcadeBody2D.getVelocity();
		let isInGround = (this.actor.arcadeBody2D.getTouches().bottom && Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, Sup.getActor("Ground").arcadeBody2D));
		
		if (isInGround)
		{
			if(! this.wasOnGround)
			{
				Sup.Audio.playSound("sfx/impact", 0.5, { pitch: 1, pan: 0, loop: false });
				this.wasOnGround = true;
			}

			this.changeState(Player_State.Human)
		}
		else
		{
			let touchTime = new Date().getTime();

			if (this.checkInput() && this.lastTimeFlap + this.timeFlapThreshold < touchTime)
			{
				Sup.Audio.playSound("sfx/voice", 0.5, { pitch: Sup.Math.Random.float(-3, -1), pan: 0, loop: false });

				this.lastTimeFlap = touchTime;

				this.actor.arcadeBody2D.setVelocity(0, 0);
				//velocity.y = (this.actor.getPosition().y > 1.5 ? 0.5 : 1) * (this.jumpForce / 1.5);
				velocity.y = this.jumpForce / 1.5;

				this.actor.spriteRenderer.setAnimation("run"); // Reset the animation, forces first frame in the next animation change
				this.actor.spriteRenderer.setAnimation("flap", false);
			}
		}

		this.actor.arcadeBody2D.setVelocity(velocity);
	}

	handleEnergyHuman()
	{
		if(this.energy < this.maxEnergy)
		{
			this.energy += this.energyRefillRate / 5;
		}
		else
		{
			this.energy = this.maxEnergy;
		}
	}

	handleEnergyBird()
	{
		this.energy -= this.energyDepleteRate;
		
		if(this.energy <= 0)
		{
			this.energy = 0;
			this.changeState(Player_State.Human);
		}
	}

	update()
	{
		if(this.isDead)
		{
			Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Ground").arcadeBody2D);

			return;
		}

		if(this.state == Player_State.Human)
		{
			this.handlePhysicsHuman();

			this.handleEnergyHuman();

			if(this.energy >= this.maxEnergy * 0.2) // 20% min
			{
				if(this.checkInput())
				{
					let touchTime = new Date().getTime();

					if(this.lastTimeTouch + this.timeTransformThreshold > touchTime)
					{
						this.changeState(Player_State.Bird);
					}

					this.lastTimeTouch = touchTime;
				}
			}
		}
		else
		{
			this.handlePhysicsBird();

			this.handleEnergyBird();
		}
	}
}

Sup.registerBehavior(Player_scriptBehavior);
