
class Camera_scriptBehavior extends Sup.Behavior
{
	heightOffset = 0.88;
	private playerActor : Sup.Actor;
	private playerBehaviour : Player_scriptBehavior;
	private desiredCameraHeight : number = 0;
	private lock = false;

	awake()
	{
		this.playerActor = Sup.getActor("Player");
		this.playerBehaviour = this.playerActor.getBehavior(Player_scriptBehavior);
	}

	update()
	{
		this.desiredCameraHeight = this.playerActor.getPosition().y + this.heightOffset;

		if(this.playerBehaviour.state == Player_State.Bird)
		{
			this.desiredCameraHeight -= 1;
		}

		let heightDiff = this.desiredCameraHeight - this.actor.getPosition().y;

		this.actor.setPosition(0, Math.max(this.actor.getPosition().y + (heightDiff / 12), 0));
	}
}

Sup.registerBehavior(Camera_scriptBehavior);
