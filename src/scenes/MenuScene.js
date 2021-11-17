import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    this.add.image(0, 0, "background").setScale(2).setOrigin(0);

    this.add
      .image(this.game.renderer.width / 2, 100, "title")
      .setScale(0.6)
      .setOrigin(0.5);

    const animatedLogo = this.add
      .sprite(this.game.renderer.width / 3, 200, "logobird")
      .setScale(1.5)
      .setOrigin(0);

    const playButton = this.add
      .image(this.game.renderer.width / 3, 350, "play_button")
      .setScale(2)
      .setOrigin(0);

    // const leaderboardButton = this.add
    //   .image((this.game.renderer.width / 4) * 3, 350, "leaderboard_button")
    //   .setScale(2)
    //   .setOrigin(0.5);

    this.anims.create({
      key: "logo_fly",
      frameRate: 3,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("logobird", {
        frames: [0, 1, 2],
      }),
    });

    animatedLogo.play("logo_fly");

    playButton.setInteractive();
    // leaderboardButton.setInteractive();

    playButton.on("pointerover", () => {
      playButton.setScale(2.1);
    });

    // leaderboardButton.on("pointerover", () => {
    //   leaderboardButton.setScale(2.1);
    // });

    playButton.on("pointerout", () => {
      playButton.setScale(2);
    });

    // leaderboardButton.on("pointerout", () => {
    //   leaderboardButton.setScale(2);
    // });

    playButton.on("pointerup", () => {
      this.scene.start("MainScene");
    });

    // leaderboardButton.on("pointerup", () => {
    //   this.scene.start("LeaderBoardScene");
    // });

    const username = localStorage.getItem("username");
    let modal;

    if (!username) {
      modal = document.createElement("div");
      modal.id = "username-modal";

      const form = document.createElement("form");
      const heading = document.createElement("h3");
      const usernameInput = document.createElement("input");
      const button = document.createElement("button");
      const span = document.createElement("span");

      heading.textContent = "Enter your username to start the game:";

      usernameInput.id = "username-input";
      usernameInput.type = "text";
      usernameInput.placeholder = "Less than 15 characters";

      button.appendChild(span);
      form.appendChild(heading);
      form.appendChild(usernameInput);
      form.appendChild(button);

      modal.appendChild(form);
      document.body.appendChild(modal);

      playButton.setVisible(false);
      // leaderboardButton.setVisible(false);

      modal.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = usernameInput.value;

        if (username.trim().length > 0) {
          modal.remove();
          localStorage.setItem("username", username);

          playButton.setVisible(true);
          // leaderboardButton.setVisible(true);
        }
      });
    }
  }
}
