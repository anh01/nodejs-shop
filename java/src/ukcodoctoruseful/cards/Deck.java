package ukcodoctoruseful.cards;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import ukcodoctoruseful.cards.Card.Suit;
import ukcodoctoruseful.cards.Card.Value;



public class Deck
{
   final List<Card> cardList = new ArrayList<Card>();
   private int index;

   void add(Card[] cards)
   {
      for (Card card : cards)
      {
         add(card);
      }
   }

   void add(Card card)
   {
      cardList.add(card);
   }

   void shuffle()
   {//randomly swap 1000 cards
      reset();
      int count = 0;
      int maxIndex = 0;
      int minIndex = cardList.size();

      do
      {
         int index1 = (int) (Math.random() * cardList.size());
         //System.out.println("index: " + index1);
         Card remove = cardList.remove(index1);
         //System.out.println(remove);
         cardList.add(remove);
         maxIndex = Math.max(index1, maxIndex);
         minIndex = Math.min(index1, minIndex);

      }
      while (++count <= 500);
      System.out.println("minIndex: " + minIndex);
      System.out.println("maxIndex: " + maxIndex);
   }

   public Card deal() throws EndOfDeckException
   {
      try
      {
         return cardList.get(index++);
      }
      catch (IndexOutOfBoundsException e)
      {
         throw new EndOfDeckException();
      }
   }

   void reset()
   {
      index = 0;
   }

   /**
    * Creates a default deck of 52 cards
    */
   public Deck()
   {
      //default 52 cards:
      for (Suit suit : EnumSet.allOf(Suit.class))
      {
         for (Value value : EnumSet.allOf(Value.class))
         {
            add(new Card(suit, value));
         }

      }
   }

   public Deck(final List<Card> cards)
   {
      add(cards.toArray(new Card[cards.size()]));
   }

   public String toString()
   {
      return TO_STRING.format(new Object[] { cardList.size() });
   }

   private MessageFormat TO_STRING = new MessageFormat("A Deck of {0} cards");
}
