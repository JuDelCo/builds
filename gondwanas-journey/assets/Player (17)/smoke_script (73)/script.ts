
class Smoke_scriptBehavior extends Sup.Behavior
{
	movSpeed = 0;
	private world : World_scriptBehavior;

	awake()
	{
		this.world = Sup.getActor("World").getBehavior(World_scriptBehavior);

		this.actor.spriteRenderer.setAnimation("poof", false);

		Sup.setTimeout(1000, () => {
			this.actor.destroy();
		});

		Sup.Audio.playSound("sfx/woosh", 0.5, { pitch: -1, pan: 0, loop: false });
	}

	update()
	{
		this.actor.move((-this.movSpeed / 1000) * this.world.moveMultiplier, 0);
	}
}

Sup.registerBehavior(Smoke_scriptBehavior);
