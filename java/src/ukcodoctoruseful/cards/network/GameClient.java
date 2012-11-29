package ukcodoctoruseful.cards.network;

import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

import ukcodoctoruseful.cards.event.CardsEvent;

public class GameClient {

	GameEventProtocol protocol;
	private Socket gameSocket;

	public GameClient() {
		connect();
	}
	
	private void connect() {
		try {
			gameSocket = new Socket(GameServer.SERVER, GameServer.PORT);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void disconnect() {
		try {
			if(gameSocket != null) {
				gameSocket.close();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void send(CardsEvent event) {
		try {
			final OutputStream os = gameSocket.getOutputStream();
			final ObjectOutputStream oos = new ObjectOutputStream(os);
			oos.writeObject(event);
			oos.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public CardsEvent receive() {
		try {
			final InputStream is = gameSocket.getInputStream();
			final ObjectInputStream ois = new ObjectInputStream(is);
			return (CardsEvent) ois.readObject();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
