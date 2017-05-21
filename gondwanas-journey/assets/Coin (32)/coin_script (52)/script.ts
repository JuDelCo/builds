
class Coin_scriptBehavior extends Sup.Behavior
{
	movSpeed = 0;
	private playerBody;
	private startHeight;
	private world : World_scriptBehavior;

	awake()
	{
		this.playerBody = Sup.getActor("Player").arcadeBody2D;
		this.startHeight = this.actor.getPosition().y;
		this.world = Sup.getActor("World").getBehavior(World_scriptBehavior);

		this.actor.spriteRenderer.setAnimation("idle", false);
		this.sparkleCoinAnim();
	}

	sparkleCoinAnim()
	{
		this.actor.spriteRenderer.playAnimation(false);

		Sup.setTimeout(Sup.Math.Random.integer(1000, 1500), () => {
			this.sparkleCoinAnim();
		});
	}

	update()
	{
		Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
		this.actor.arcadeBody2D.warpPosition(this.actor.getPosition().x + (-this.movSpeed / 1000) * this.world.moveMultiplier, this.startHeight);
		
		if(this.actor.getPosition().x < -4)
		{
			this.actor.destroy();
		}
		
		if(Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, this.playerBody))
		{
			Sup.Audio.playSound("sfx/gold-1", 0.6);
			this.actor.destroy();
			Sup.getActor("World").getBehavior(World_scriptBehavior).score += 50;
			Sup.getActor("Player").getBehavior(Player_scriptBehavior).addEnergy(15.0);
		}
	}
}

Sup.registerBehavior(Coin_scriptBehavior);
