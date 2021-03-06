// JavaScript source code
var myData = {
    "user": {
        "id": 0,
        "name": "",
        "email": "",
        "starttime": "",
        "endtime": "",
        "lng": "en",
        "buddy_details": "",
        "session_id": "",
        "rightanswers": 0,
        "wronganswers": 0
    },
    "attempt": [
    ]
}
var attempt = {
    "qid": 0,
    "failattempt": [
    ],
    "answer": {
        "answerid": 0,
        "time": ""
    }
}
var failattempt = {
    "optionid": "",
    "time": ""
}
var planet = {
    start: function (lng) {
        myData.user.id = $.cookie("user_id");
        myData.user.name = $.cookie("name");
        myData.user.email = $.cookie("email");
        myData.user.buddy_details = $.cookie("user_and_buddy_ids");
        myData.user.session_id = $.cookie("session_id");
        myData.user.starttime = timeStamp();
        myData.user.lng = lng;
        planet.save();
    },
    addAnswer: function (id, e) {
        //debugger;
        var obj = null;
        for (var i = 0; i <= myData.attempt.length - 1; i++) {
            if (myData.attempt[i].qid == qid) {
                obj = myData.attempt[i];
                break;
            }
        }
        if (obj == null) {
            obj = $.extend(true, {}, attempt);
            obj.qid = qid;
            if (e) {
                obj.answer = id;
                obj.time = timeStamp();
            } else {
                var att = $.extend(true, {}, failattempt);
                att.optionid = id
                att.time = timeStamp();
                obj.failattempt.push(att);
            }
            myData.attempt.push(obj);
        } else {
            obj.qid = qid;
            if (e) {
                obj.answer = id;
                obj.time = timeStamp();
            } else {
                var att = $.extend(true, {}, failattempt);
                att.optionid = id
                att.time = timeStamp();
                obj.failattempt.push(att);
            }
        }
        planet.save();
    },
    save: function () {
        $.cookie("data", JSON.stringify(myData));
        console.log(myData);
    },
    readData: function () {
        myData = $.parseJSON($.cookie("data"));
    },
    end: function () {
        myData.user.endtime = timeStamp();
        planet.save();
    },
    updateScore: function (s) {
        myData.user.rightanswers = s;
        myData.user.wronganswers = 10 - s;
        planet.save();
        /*$.ajax({
            url: "../saveJson.php?data=" + $.cookie("data"),
            success: function (response) {
                console.log(response);
                window.open('../data.json', '_blank');
            }
        });*/
        csrftoken = 12;
        $.ajax({
            type: "POST",
            data: {
                "user_data": $.cookie("data"),
                "app_name": "policesquad",
                'csrfmiddlewaretoken': csrftoken,
            },
            url: "/tools/logging",
            datatype: "json",
            success: function (data) {
                console.log(data);
            }
        });
    }
}

function timeStamp() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

function setuserdetail() { // You don't need this function, since cookie is coming from some other place
    $.cookie("user_id", "1");
    $.cookie("session_id", "qe6wydl8mflsw3fol8u92t7e0os1q4z2");
    $.cookie("user_and_buddy_ids", "1&988");
    $.cookie("name", "John Doe");
    $.cookie("email", "john.doe@nothing.com");
}
