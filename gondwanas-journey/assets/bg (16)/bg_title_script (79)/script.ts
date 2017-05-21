
class Bg_title_scriptBehavior extends Sup.Behavior
{
	maxHeightAdded = 0;
	private minHeight = 0;
	private counter = 0;

	awake()
	{
		this.minHeight = this.actor.getPosition().y;
	}

	update()
	{
		let height = Math.sin((this.counter++) / 500);
		height = (height * this.maxHeightAdded / 3) + this.minHeight + (this.maxHeightAdded / 3);
		height = Math.max(height, this.minHeight);

		this.actor.setPosition(this.actor.getPosition().x, height);
	}
}

Sup.registerBehavior(Bg_title_scriptBehavior);
