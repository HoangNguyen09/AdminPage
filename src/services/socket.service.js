const SocketService = {};

let rooms = [];

SocketService.init = (socket) => {
    let room = {
        roomId: "",
        master: "",
        video: {},
        playlist: [],
        viewers: [],
    };
    socket.on("join-room", (roomId) => {
        if (hasRoom(roomId)) {
            addViewer(roomId, socket.id);
            if (Object.keys(getCurrentVideo(roomId)).length !== 0) {
                socket.emit("change-video", getCurrentVideo(roomId));
            }
        } else {
            room.roomId = roomId;
            room.master = socket.id;
            socket.emit("master");
            rooms.push(room);
        }

        socket.join(roomId);

        socket.on("change-video", (video) => {
            if (checkMaster(roomId, socket.id)) {
                socket.emit("master-change-video", video);
                socket.to(roomId).emit("change-video", video);
                setCurrentVideo(roomId, video);
            }
        });

        socket.on("position", (position) => {
            socket.to(roomId).emit("position", position);
        });

        socket.on("pause", () => {
            socket.to(roomId).emit("pause");
        });

        socket.on("play", () => {
            socket.to(roomId).emit("play");
        });

        socket.on("disconnect", () => {
            if (checkMaster(roomId, socket.id)) {
                removeViewer(roomId, socket.id);
                socket.to(roomId).emit("master-disconnect");
            } else {
                removeViewer(roomId, socket.id);
                socket.to(roomId).emit("viewer-disconnect");
            }
        });
    });
};

function hasRoom(id) {
    return rooms.findIndex((e) => e.roomId === id) > -1;
}

function setCurrentVideo(id, video) {
    rooms.map((room) => {
        if (room.roomId === id) {
            room.video = video;
        }
    });
}

function getCurrentVideo(id) {
    return rooms[rooms.findIndex((e) => e.roomId === id)].video;
}

function addViewer(id, viewer) {
    rooms.map((room) => {
        if (room.roomId === id) {
            room.viewers.push(viewer);
        }
    });
}

function removeViewer(id, viewer) {
    if (checkMaster(id, viewer)) {
        rooms.splice(
            rooms.findIndex((e) => e.roomId === id),
            1
        );
    } else {
        rooms.map((room) => {
            if (room.roomId === id) {
                const index = room.viewers.indexOf(viewer);
                room.viewers.splice(index, 1);
            }
        });
    }
}

function checkMaster(id, viewer) {
    if (rooms.findIndex((e) => e.roomId === id) > -1) {
        return rooms[rooms.findIndex((e) => e.roomId === id)].master === viewer;
    }
}

module.exports = SocketService;
