import java.util.*;

public class DataStore {

    public static List<Room> getRooms() {
        List<Room> rooms = new ArrayList<>();

        rooms.add(new Room(
                "Room A",
                10,
                Arrays.asList("Projector", "AC"),
                Arrays.asList("10AM", "11AM", "2PM")
        ));

        rooms.add(new Room(
                "Room B",
                20,
                Arrays.asList("AC"),
                Arrays.asList("9AM", "11AM", "3PM")
        ));

        rooms.add(new Room(
                "Room C",
                5,
                Arrays.asList("Projector"),
                Arrays.asList("10AM", "1PM", "4PM")
        ));

        return rooms;
    }
}
