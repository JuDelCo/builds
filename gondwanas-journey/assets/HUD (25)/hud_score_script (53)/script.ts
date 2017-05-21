
class Hud_score_scriptBehavior extends Sup.Behavior
{
	private world : Sup.Actor;

	awake()
	{
		this.world = Sup.getActor("World");
	}

	update()
	{
		let zeros = "00000";
		let score = this.world.getBehavior(World_scriptBehavior).score.toFixed();
		this.actor.textRenderer.setText(zeros.substring(0, zeros.length - score.length) + score);
	}
}

Sup.registerBehavior(Hud_score_scriptBehavior);
