package ukcodoctoruseful.net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

import ukcodoctoruseful.log.LogAssistant;


public class MultiServerAcceptRunnable implements Runnable
{
   private MultiServer server;
   private Socket client;
   private final LogAssistant logger = new LogAssistant(this);
   private PrintWriter out;
   private BufferedReader in;

   MultiServerAcceptRunnable(MultiServer server, Socket client) throws IOException
   {
      this.server = server;
      this.client = client;
      out = new PrintWriter(client.getOutputStream());
      in = new BufferedReader(new InputStreamReader(client.getInputStream()));


   }

   @Override
   public void run()
   {
      //      int messageCount = 5;
      logger.info("Connected to " + client);
      do
      {
         try
         {
            //            writeResponse();
            //            Thread.sleep(1000);
            read();
            //            Thread.sleep(1000);

         }
         //         catch (InterruptedException e)
         //         {
         //            logger.throwable(e);
         //         }
         catch (IOException e)
         {
            logger.throwable(e);
         }
      }
      while (server.isAcceptingConnections());
      //      while (--messageCount >= 0 && server.isAcceptingConnections());
      try
      {
         sayGoodbye();
      }
      catch (IOException e)
      {
         logger.throwable(e);
      }

   }

   private void read() throws IOException
   {
      final String readLine = in.readLine();
      System.out.println(readLine);
      if (readLine.equals("SHUTDOWN"))
      {
         server.stopAcceptingConnections();
      }

   }

   private void writeResponse()
   {
      out.println("What have you got to say for yourself?");
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
