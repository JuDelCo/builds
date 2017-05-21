
class Bg_movementBehavior extends Sup.Behavior
{
	movSpeed = 0;
	maxHeightAdded = 0;
	private minHeight = 0;
	private duplicated = false;
	private playerActor : Sup.Actor;
	private world : World_scriptBehavior;

	awake()
	{
		this.playerActor = Sup.getActor("Player");
		this.world = Sup.getActor("World").getBehavior(World_scriptBehavior);

		this.minHeight = this.actor.getPosition().y;

		if(this.actor.getPosition().x < 0)
		{
			this.duplicated = true;
		}
	}

	generateNewName() : string
	{
		let currentName = this.actor.getName();
		let underscorePos = currentName.indexOf("_");
		let prefix = currentName.substr(0, underscorePos + 1);
		let oldId : number = parseInt(currentName.substr(underscorePos + 1));
		
		return prefix + (oldId + 1).toFixed(0);
	}

	getSpritePixelsPerUnit() : number
	{
		return this.actor.spriteRenderer.getSprite().getPixelsPerUnit();
	}

	getBgWidthInUnits() : number
	{
		return this.actor.spriteRenderer.getSprite().getGridSize().width / this.getSpritePixelsPerUnit();
	}

	update()
	{
		this.actor.move((-this.movSpeed / 1000) * this.world.moveMultiplier, 0);

		let height = (this.playerActor.getPosition().y + 0.74) / 2.74; // player height clamped 0~1;
		height = (height * this.maxHeightAdded) + this.minHeight;
		height = Math.max(height, this.minHeight);

		this.actor.setPosition(this.actor.getPosition().x, height);

		if(this.duplicated == false)
		{
			if(this.actor.getPosition().x + this.getBgWidthInUnits() < Sup.Game.getScreenRatio().width / this.getSpritePixelsPerUnit())
			{
				this.duplicated = true;

				let newBgName = this.generateNewName();
				let newBg = new Sup.Actor(newBgName, this.actor.getParent());
				let newBgSprite = new Sup.SpriteRenderer(newBg);

				newBg.setPosition((Sup.Game.getScreenRatio().width / this.getSpritePixelsPerUnit()) - 0.02, this.minHeight, this.actor.getPosition().z);
				newBgSprite.setSprite(this.actor.spriteRenderer.getSprite());
				newBg.addBehavior(Bg_movementBehavior, { movSpeed: this.movSpeed, maxHeightAdded: this.maxHeightAdded });
			}
		}
		else
		{
			if(this.actor.getPosition().x < -this.getBgWidthInUnits() * 2)
			{
				this.actor.destroy();
			}
		}
	}
}

Sup.registerBehavior(Bg_movementBehavior);
