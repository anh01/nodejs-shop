package ukcodoctoruseful.cards;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import ukcodoctoruseful.cards.network.GameClient;

public class Player {

	private Logger logger = Logger.getLogger(getClass().getName());
	private final String playerId;
	private double pot = 0.0;
	private List<Card> hand;
	final private GameClient gameClient;

	public static void main(String[] args) {
		new Player(500.0, "Stephen");
	}
	public Player(Game game, String playerId) {
		this(game.getInitialStake(), playerId);
	}

	public Player(double initialStake, final String playerId) {
		this.pot += initialStake;
		this.playerId = playerId;
		hand = new ArrayList<Card>();
		logger.info("Starting connection...");
		gameClient = new GameClient();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.info("Shutting down...");
		gameClient.disconnect();

	}

	public List<Card> fold(boolean show) {
		List<Card> lastHand = null;
		if (show) {
			lastHand = Collections.unmodifiableList(hand);
		}
		hand.clear();
		return lastHand;
	}

	public void see(double bet) {
		pot -= bet;
		return;
	}

	public void raise(double bet) {

	}

	public String toString() {
		return super.toString() + ":" + getPlayerId() + ":" + pot;
	}

	/**
	 * @return the playerId
	 */
	public String getPlayerId() {
		return playerId;
	}

}
