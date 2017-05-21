
class World_scriptBehavior extends Sup.Behavior
{
	score : number = 0;
	moveMultiplier : number = 1;
	restartAvailable = false;
	private music : Sup.Audio.SoundPlayer;
	private highScore = 0;
	private enemyGroundScene = "Enemies/ground/EnemyGround";
	private kidGroundScene = "Enemies/ground/KidGround";
	private enemySkyScene = "Enemies/sky/EnemySky";
	private coinScene = "Coin/Coin";
	private enemyCount : number = 0;
	private cointCount : number = 0;
	private startTime = new Date().getTime();

	gameOver()
	{
		this.music.stop();

		Sup.setTimeout(2500, () => {
			Sup.Audio.playSound("music/gameover", 0.5);
		});

		if(this.score > this.highScore)
		{
			this.highScore = this.score;
			Sup.Storage.set("highScore", this.highScore.toFixed(0));
		}

		Sup.setTimeout(3300, () => {
			Sup.getActor("GameOver").setVisible(true);
			
			Sup.setTimeout(1000, () => {
				Sup.getActor("World").getBehavior(World_scriptBehavior).restartAvailable = true;
				
				Sup.setTimeout(7500, () => {
					var timeOutId = Sup.setTimeout(0, () => {});

					while(timeOutId--)
					{
						Sup.clearTimeout(timeOutId);
					}

					Sup.loadScene("TitleScreen");
				});
			});
		});

		new Sup.Tween(this.actor, { "value": (Sup.getActor("Player").getBehavior(Player_scriptBehavior).state == Player_State.Human ? -0.5 : -1.5) })
		  .to({ "value": 0 }, 800)
		  //.easing(TWEEN.Easing.Cubic.InOut)
		  .onUpdate((object) =>
		  {
			Sup.getActor("World").getBehavior(World_scriptBehavior).moveMultiplier = object.value;
		  })
		  .onComplete(() =>
		  {
			Sup.getActor("World").getBehavior(World_scriptBehavior).moveMultiplier = 0;
		  })
		  .start();

		/*Sup.setTimeout(700, () => {
			Sup.getActor("World").getBehavior(World_scriptBehavior).moveMultiplier = 0;
		});*/
	}

	generateSkyCoin()
	{
		let actor = new Sup.Actor(this.cointCount.toFixed(0));
		actor.setPosition(2.5, Sup.Math.Random.float(0.5, 2));
		Sup.appendScene(this.coinScene, actor);
		actor.getChild("Coin").getBehavior(Coin_scriptBehavior).movSpeed = 20;
		this.cointCount++;
		
		Sup.setTimeout(Sup.Math.Random.integer(1000,2300), () => {
			this.generateSkyCoin();
		});
	}

	generateGroundCoin()
	{
		let actor = new Sup.Actor(this.cointCount.toFixed(0));
		actor.setPosition(2.5, -0.7);
		Sup.appendScene(this.coinScene, actor);
		actor.getChild("Coin").getBehavior(Coin_scriptBehavior).movSpeed = 17;
		this.cointCount++;

		Sup.setTimeout(Sup.Math.Random.integer(3000,5000), () => {
			this.generateGroundCoin();
		});
	}

	generateGroundObstacle()
	{
		let actor = new Sup.Actor(this.enemyCount.toFixed(0));
		actor.setPosition(2.5, -0.86);

		if(Sup.Math.Random.integer(0,100) < 92 || (new Date().getTime()) < this.startTime + 15000)
		{
			Sup.appendScene(this.enemyGroundScene, actor);
		}
		else
		{
			Sup.appendScene(this.kidGroundScene, actor);
		}
		
		this.enemyCount++;
		
		Sup.setTimeout(Sup.Math.Random.integer(2000,3000), () => {
			this.generateGroundObstacle();
		});
	}

	generateSkyObstacle()
	{
		let actor = new Sup.Actor(this.enemyCount.toFixed(0));
		actor.setPosition(2.5, Sup.Math.Random.float(0.5, 2));
		Sup.appendScene(this.enemySkyScene, actor);
		this.enemyCount++;

		Sup.setTimeout(Sup.Math.Random.integer(2000,3000), () => {
			this.generateSkyObstacle();
		});
	}

	checkInput() : boolean
	{
		if(Sup.Input.wasTouchStarted(0) || Sup.Input.wasMouseButtonJustPressed(0))
		{
			return true;
		}
		
		return false;
	}

	awake()
	{
		this.highScore = parseInt(Sup.Storage.get("highScore", "0"));

		this.music = Sup.Audio.playSound("music/maintheme", 0.25, { pitch: 0, pan: 0, loop: true });

		this.generateSkyCoin();

		/*Sup.setTimeout(3000, () => {
			this.generateGroundCoin();
		});*/

		Sup.setTimeout(2000, () => {
			this.generateGroundObstacle();
			this.generateSkyObstacle();
		});
	}

	update()
	{
		if(this.restartAvailable)
		{
			if(this.checkInput())
			{
				var timeOutId = Sup.setTimeout(0, () => {});

				while(timeOutId--)
				{
					Sup.clearTimeout(timeOutId);
				}

				Sup.loadScene("Game");

				Sup.Audio.playSound("sfx/cure", 0.5, { pitch: 0, pan: 0, loop: false });
			}
		}
	}
}

Sup.registerBehavior(World_scriptBehavior);
