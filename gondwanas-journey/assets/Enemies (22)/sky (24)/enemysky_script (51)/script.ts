
class Enemysky_scriptBehavior extends Sup.Behavior
{
	movSpeed = 0;
	private playerBody : Sup.ArcadePhysics2D.Body;
	private startHeight;
	private attacking = false;

	awake()
	{
		this.playerBody = Sup.getActor("Player").arcadeBody2D;
		this.startHeight = this.actor.getPosition().y;
	}

	update()
	{
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
		this.actor.arcadeBody2D.warpPosition(this.actor.getPosition().x + (-this.movSpeed / 1000), this.startHeight);
		
		if(this.actor.getPosition().x < -4)
		{
			this.actor.destroy();
		}
		
		if(! this.attacking && this.playerBody.actor.getPosition().distanceTo(this.actor.getPosition()) < 1)
		{
			this.attacking = true;
			this.actor.spriteRenderer.setAnimation("attack", true);
		}
		
		if(Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, this.playerBody))
		{
			Sup.getActor("Player").getBehavior(Player_scriptBehavior).kill();
		}
	}
}

Sup.registerBehavior(Enemysky_scriptBehavior);
