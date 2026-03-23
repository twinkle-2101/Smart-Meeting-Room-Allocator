import java.util.*;

public class Allocator {

    public static Room allocateRoom(List<Room> rooms, BookingRequest request) {

        List<Room> validRooms = new ArrayList<>();

        // Step 1: Apply Constraints
        for (Room room : rooms) {

            boolean capacityOk = room.capacity >= request.numberOfPeople;
            boolean timeOk = room.isAvailable(request.timeSlot);
            boolean facilityOk = room.hasFacilities(request.requiredFacilities);

            if (capacityOk && timeOk && facilityOk) {
                validRooms.add(room);
            }
        }

        // Step 2: If no room found
        if (validRooms.isEmpty()) {
            return null;
        }

        // Step 3: Select Best Room (Greedy Approach)
        Room bestRoom = validRooms.get(0);

        for (Room room : validRooms) {
            // choose room with minimum extra capacity
            if ((room.capacity - request.numberOfPeople) <
                (bestRoom.capacity - request.numberOfPeople)) {

                bestRoom = room;
            }
        }

        return bestRoom;
    }
}