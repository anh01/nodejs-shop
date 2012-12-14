package ukcodoctoruseful.net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

import ukcodoctoruseful.log.LogAssistant;


public class MultiServerAcceptRunnable implements Runnable
{
   private MultiServer server;
   private Socket client;
   private final LogAssistant logger = new LogAssistant(this);
   private PrintWriter out;
   private BufferedReader in;

   MultiServerAcceptRunnable(final MultiServer server, final ServerSocket serverSocket) throws IOException
   {
      this.server = server;
      this.client = serverSocket.accept();
      out = new PrintWriter(client.getOutputStream());
      in = new BufferedReader(new InputStreamReader(client.getInputStream()));


   }

   @Override
   public void run()
   {
      //      int messageCount = 5;
      logger.info("Connected to " + client);
      String line = null;
      do
      {
         try
         {
            line = read();
            logger.info(client + " " + line);
         }
         catch (IOException e)
         {
            logger.throwable(e);
         }
      }
      while (line != null && server.isAcceptingConnections());


      sayGoodbyeGracefully();

   }

   /**
    * 
    */
   protected void sayGoodbyeGracefully()
   {
      try
      {
         sayGoodbye();
      }
      catch (IOException e)
      {
         logger.throwable(e);
      }
   }

   private String read() throws IOException
   {
      final String readLine = in.readLine();
      if (readLine.equals("SHUTDOWN"))
      {
         server.shutdown();
      }
      return readLine;

   }

   private void sayGoodbye() throws IOException
   {
      out.println("Bye.");
      out.flush();
      out.close();
      in.close();
      client.close();
   }
}
