
class Ground_scriptBehavior extends Sup.Behavior
{
	movSpeed = 0;
	duplicated = false;
	private world : World_scriptBehavior;

	awake()
	{
		this.world = Sup.getActor("World").getBehavior(World_scriptBehavior);

		if(this.actor.getPosition().x < 2)
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

	getTileSetPixelsPerUnit() : number
	{
		return this.actor.tileMapRenderer.getTileMap().getPixelsPerUnit();
	}

	getTileMapWidthInUnits() : number
	{
		return (this.actor.tileMapRenderer.getTileMap().getWidth() * this.actor.tileMapRenderer.getTileSet().getGridSize().width) / this.getTileSetPixelsPerUnit();
	}

	update()
	{
		this.actor.move((-this.movSpeed / 1000) * this.world.moveMultiplier, 0);

		if(this.duplicated == false)
		{
			if(this.actor.getPosition().x + this.getTileMapWidthInUnits() < Sup.Game.getScreenRatio().width / this.getTileSetPixelsPerUnit())
			{
				this.duplicated = true;

				let newGroundName = this.generateNewName();
				let newGround = new Sup.Actor(newGroundName, this.actor.getParent());
				let newGroundTileMap = new Sup.TileMapRenderer(newGround);

				newGround.setPosition((Sup.Game.getScreenRatio().width / this.getTileSetPixelsPerUnit()) - 0.02, this.actor.getPosition().y, this.actor.getPosition().z);
				newGroundTileMap.setTileMap(this.actor.tileMapRenderer.getTileMap());
				newGroundTileMap.setTileSet(this.actor.tileMapRenderer.getTileSet());
				newGround.addBehavior(Ground_scriptBehavior, { movSpeed: this.movSpeed });
			}
		}
		else
		{
			if(this.actor.getPosition().x < -this.getTileMapWidthInUnits() * 2)
			{
				this.actor.destroy();
			}
		}
	}
}

Sup.registerBehavior(Ground_scriptBehavior);
