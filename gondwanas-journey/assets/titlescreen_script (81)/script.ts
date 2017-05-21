
class Titlescreen_scriptBehavior extends Sup.Behavior
{
	private ready = false;
	private startPressed = false;

	awake()
	{
		Sup.setTimeout(3000, () => {
			Sup.getActor("Start").setVisible(true);
			this.ready = true;
		});
	}

	checkInput() : boolean
	{
		if(Sup.Input.wasTouchStarted(0) || Sup.Input.wasMouseButtonJustPressed(0))
		{
			return true;
		}
		
		return false;
	}

	update()
	{
		if(this.ready && ! this.startPressed)
		{
			if(this.checkInput())
			{
				this.startPressed = true;

				Sup.Audio.playSound("sfx/success", 0.5, { pitch: 0.5, pan: 0, loop: false });
				Sup.getActor("Start").setVisible(false);

				Sup.setTimeout(1000, () => {
					new Sup.Tween(Sup.getActor("Fade"), { "opacity": 0 })
						.to({ "opacity": 1 }, 800)
						.easing(TWEEN.Easing.Cubic.Out)
						.onUpdate((object) =>
						{
							Sup.getActor("Fade").spriteRenderer.setOpacity(object.opacity);
						})
						.onComplete(() =>
						{
							Sup.loadScene("Game");
						})
						.start();
				});
			}
		}
	}
}

Sup.registerBehavior(Titlescreen_scriptBehavior);
