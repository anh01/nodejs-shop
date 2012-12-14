package ukcodoctoruseful.net;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.List;

import ukcodoctoruseful.log.LogAssistant;


public class MultiServer
{

   private enum Command
   {
      START, SHUTDOWN
   };

   public static final int PORT_65535 = 65535;

   private final LogAssistant logger = new LogAssistant(this);


   public static void main(String[] args) throws UnknownHostException, IOException
   {
      final Command command = Command.valueOf(args[0]);
      switch (command)
      {
         case START:
            startup();
            break;
         case SHUTDOWN:
            shutdownServer();
            break;
      }
   }

   private static void shutdownServer() throws UnknownHostException, IOException
   {
      //act as a client: broadcast the shutdown event to the server.
      Socket s = new Socket("localhost", PORT_65535);
      PrintWriter pw = new PrintWriter(s.getOutputStream());
      pw.println("SHUTDOWN");
      pw.close();
      s.close();
   }

   /**
    * 
    */
   protected static void startup()
   {
      final MultiServer multiServer = new MultiServer();
      addShutdownHook(multiServer);
      multiServer.run();
   }

   private int port;
   private ServerSocket serverSocket;

   private boolean accepting;

   private ThreadGroup listenersGroup;

   private final List<MultiServerAcceptRunnable> clients = new LinkedList<MultiServerAcceptRunnable>();

   MultiServer()
   {
      this(PORT_65535);
   }

   public MultiServer(int port)
   {
      this.port = port;

   }

   /**
    * 
    */
   protected static void addShutdownHook(final MultiServer server)
   {
      Runtime.getRuntime().addShutdownHook(new Thread()
      {
         public void run()
         {
            System.out.println("Shutting down...");
            try
            {
               server.shutdown();
            }
            catch (IOException e)
            {
               System.err.println(e);
            }
            finally
            {
               System.out.println("Shut down.");

            }
         }
      });
   }

   public void run()
   {
      try
      {
         serverSocket = init();
         final Runnable clientConnector = new Runnable()
         {
            public void run()
            {
               logger.info("Running");
               acceptRequests();
            }
         };
         new Thread(clientConnector).start();
         //         Thread.sleep(DEFAULT_RUN_TIME);
      }
      catch (IOException e)
      {
         logger.throwable(e);
      }
      finally
      {
      }


   }

   //run this in a separate thread!
   private void acceptRequests()
   {
      logger.logStart("acceptRequests");
      accepting = true;
      listenersGroup = new ThreadGroup("connection listeners");
      while (isAcceptingConnections())
      {
         try
         {
            final MultiServerAcceptRunnable target = new MultiServerAcceptRunnable(this, serverSocket);
            new Thread(listenersGroup, target).start();
         }
         catch (SocketException e)
         {
            logger.info(e.getMessage());
         }
         catch (IOException e)
         {
            logger.throwable(e);
         }
      }
      logger.logEnd("acceptRequests");
   }



   private ServerSocket init() throws IOException
   {
      logger.logStart("init");
      serverSocket = new ServerSocket(port);
      logger.logEnd("init");
      return serverSocket;
   }

   void shutdown() throws IOException
   {
      logger.logStart("shutdown");
      stopAcceptingConnections();
      if (serverSocket != null && !serverSocket.isClosed())
      {
         synchronized (serverSocket)
         {
            if (!serverSocket.isClosed())
            {
               logger.info("Closing Server Socket");
               serverSocket.close();
            }
         }
      }
      logger.logEnd("shutdown");

   }


   /**
    * 
    */
   protected void stopAcceptingConnections()
   {
      logger.logStart("stopAcceptingConnections");
      accepting = false;
      logger.logEnd("stopAcceptingConnections");
   }

   public boolean isAcceptingConnections()
   {
      return accepting;
   }
}
