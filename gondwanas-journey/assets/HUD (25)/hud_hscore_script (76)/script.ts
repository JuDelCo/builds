
class Hud_hscore_scriptBehavior extends Sup.Behavior
{
	awake()
	{
		let zeros = "00000";
		let score = parseInt(Sup.Storage.get("highScore", "0")).toFixed();
		this.actor.textRenderer.setText(zeros.substring(0, zeros.length - score.length) + score);
	}
}

Sup.registerBehavior(Hud_hscore_scriptBehavior);
