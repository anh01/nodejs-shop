package ukcodoctoruseful.net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Date;

import ukcodoctoruseful.log.LogAssistant;


public class NetClient implements Runnable
{
   final LogAssistant logAssistant = new LogAssistant(this);
   private Socket kkSocket;
   private PrintWriter out;
   private BufferedReader in;

   public static void main(String[] args)
   {
      NetClient netClient = new NetClient();
      new Thread(netClient).start();
   }

   /**
    * @param netClient
    */
   public void run()
   {
      connect();
      try
      {
         communicate();
      }
      catch (InterruptedException e)
      {
         logAssistant.info(e.toString());
      }
      catch (IOException e)
      {
         logAssistant.throwable(e);
      }
      finally
      {
         disconnect();

      }
   }

   /**
    * Change to receive event objects.
    * 
    * @throws IOException
    * @throws InterruptedException
    */
   private void communicate() throws IOException, InterruptedException
   {
      logAssistant.info("Communicating...");

      try
      {

         int talkCount = 5;
         //         String fromServer;
         if (in != null && out != null)
         {
            while (talkCount-- >= 0)// && (fromServer = in.readLine()) != null)
            {
               //               logAssistant.info("Server: " + fromServer);
               //               if (fromServer.equals("Bye."))
               //               {
               //                  break;
               //               }
               Thread.sleep(300);

               final String createMessage = createMessage();
               System.out.println("Client: " + createMessage);
               out.println("Random Message:" + createMessage);

            }
         }
      }
      finally
      {
         logAssistant.info("Communicated.");

      }

   }

   private String createMessage()
   {
      return new Date().toString();
   }

   private void disconnect()
   {
      logAssistant.info("Disconnecting...");

      try
      {
         if (kkSocket != null)
         {
            if (!kkSocket.isClosed())
            {
               kkSocket.close();
            }

         }
      }
      catch (IOException e)
      {
         logAssistant.throwable(e);

      }
      finally
      {
         logAssistant.info("Disconnected.");

      }

   }

   private void connect()
   {
      logAssistant.info("Connecting...");
      try
      {
         kkSocket = new Socket("localhost", MultiServer.PORT_65535);
         out = new PrintWriter(kkSocket.getOutputStream(), true);
         in = new BufferedReader(new InputStreamReader(kkSocket.getInputStream()));
      }
      catch (UnknownHostException e)
      {
         logAssistant.throwable(e);
      }
      catch (IOException e)
      {
         logAssistant.throwable(e);
      }
      finally
      {
         logAssistant.info("Connected.");
      }

   }

   NetClient()
   {

   }

}
