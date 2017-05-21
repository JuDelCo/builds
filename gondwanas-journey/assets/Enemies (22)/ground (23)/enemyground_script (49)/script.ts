
class Enemyground_scriptBehavior extends Sup.Behavior
{
	movSpeed = 0;
	private playerBody;
	private world : World_scriptBehavior;
	private attacking = false;

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

		if(! this.attacking && this.playerBody.actor.getPosition().distanceTo(this.actor.getPosition()) < 0.5)
		{
			this.attacking = true;
			this.actor.spriteRenderer.setAnimation("attack", false);
			
			Sup.setTimeout(750, () => {
				this.actor.spriteRenderer.setAnimation("idle", true);
			});
		}

		if(Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, this.playerBody))
		{
			Sup.getActor("Player").getBehavior(Player_scriptBehavior).kill();
		}
	}
}

Sup.registerBehavior(Enemyground_scriptBehavior);
