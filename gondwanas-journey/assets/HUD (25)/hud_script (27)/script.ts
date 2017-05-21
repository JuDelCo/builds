
class Hud_scriptBehavior extends Sup.Behavior
{
	private barActor : Sup.Actor;
	private playerBehaviour : Player_scriptBehavior;

	awake()
	{
		this.barActor = this.actor.getChild("bar");
		this.playerBehaviour = Sup.getActor("Player").getBehavior(Player_scriptBehavior);
	}

	update()
	{
		let value = this.playerBehaviour.energy / this.playerBehaviour.maxEnergy;
		
		if(value <= 0)
		{
			this.barActor.setVisible(false);
		}
		else
		{
			this.barActor.setLocalScaleX(value);
			this.barActor.setVisible(true);
		}
	}
}

Sup.registerBehavior(Hud_scriptBehavior);
