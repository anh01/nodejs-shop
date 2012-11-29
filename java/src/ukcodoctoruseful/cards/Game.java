package ukcodoctoruseful.cards;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import ukcodoctoruseful.cards.event.CardsEvent;
import ukcodoctoruseful.cards.event.CardsEventListener;
import ukcodoctoruseful.cards.network.GameServer;

public class Game implements CardsEventListener {
	private Croupier croupier;
	private List<Player> players;
	private Pot pot;
	private double initialStake;
	private GameServer server;

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		final Game game = new PokerGame();
		game.play(Double.parseDouble(args[0]));

	}

	protected Game() {
		server = new GameServer();

	}
	private void play(double initialStake) {
		croupier = new Croupier();
		setInitialStake(initialStake);
		players = new ArrayList<Player>();
		waitForPlayers(2);
		croupier.deal(this);
		// ante up - small, big, antes
		// deal river
		// players bet
		// deal turn
		// players bet
		// deal final
		// players bet
		// start again.

	}

	protected void waitForPlayers(int i) {
		server.waitForConnections(3);
	}


	public List<Player> getPlayers() {
		return Collections.unmodifiableList(players);
	}

	/**
	 * @return the initialStake
	 */
	public double getInitialStake() {
		return initialStake;
	}

	/**
	 * @param initialStake
	 *            the initialStake to set
	 */
	public void setInitialStake(double initialStake) {
		this.initialStake = initialStake;
	}

	@Override
	public void handle(CardsEvent event) {

	}

}
