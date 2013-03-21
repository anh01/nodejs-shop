package ukcodoctoruseful.cards.network;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GameServer {
	private Logger logger = Logger.getLogger(getClass().getName());

	public static final int PORT = 9089;
	public static final String SERVER = "localhost";

	private ServerSocket serverSocket;
	private final List<Socket> clientSockets = new ArrayList<Socket>();

	public GameServer() {
		try {
			serverSocket = new ServerSocket(PORT);
			serverSocket.setSoTimeout(10000);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			logger.log(Level.SEVERE, "Server setup failed", e);
			System.exit(1);
		}
	}

	public void waitForConnections(int maxNum) {
		Runnable waiter = new Runnable() {
			@Override
			public void run() {
				try {
					final Socket clientSocket = serverSocket.accept();
					logger.info("Connection on "
							+ clientSocket.getRemoteSocketAddress());
					synchronized (clientSockets) {
						clientSockets.add(clientSocket);
					}
				} catch (SocketTimeoutException e) {
					logger.log(Level.SEVERE, "Timeout", e);
				} catch (IOException e) {
					logger.log(Level.SEVERE, "No Connection", e);

				}
			}

		};
		// spawn 3 threads, wait for 5s, then end.
		ThreadGroup tg = new ThreadGroup("waiters");
		tg.setDaemon(true);

		for (int i = maxNum; --i >= 0;) {
			Thread t = new Thread(tg, waiter);
			logger.info(t.toString());
			t.start();
		}

		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		synchronized (tg) {
			if (!tg.isDestroyed()) {
				tg.stop();
				try {
					tg.wait();
				} catch (InterruptedException e) {
					logger.log(Level.SEVERE, "Uh Oh!", e);
				}
			}

		}
		synchronized (clientSockets) {
			logger.log(Level.INFO,
					"Number of connections: " + clientSockets.size());
		}

	}
}