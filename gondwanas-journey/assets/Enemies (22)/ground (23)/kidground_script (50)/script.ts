
class Kidground_scriptBehavior extends Sup.Behavior
{
	movSpeed = 0;
	private playerBody;
	private world : World_scriptBehavior;

	awake()
	{
		this.playerBody = Sup.getActor("Player").arcadeBody2D;
		this.world = Sup.getActor("World").getBehavior(World_scriptBehavior);
	}

	update()
	{
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
		this.actor.arcadeBody2D.warpPosition(this.actor.getPosition().x + (-this.movSpeed / 1000) * this.world.moveMultiplier, this.actor.getPosition().y);
		
		if(this.actor.getPosition().x < -4)
		{
			this.actor.destroy();
		}
		
		if(Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, this.playerBody))
		{
			Sup.getActor("Player").getBehavior(Player_scriptBehavior).kill();
		}
	}
}

Sup.registerBehavior(Kidground_scriptBehavior);
