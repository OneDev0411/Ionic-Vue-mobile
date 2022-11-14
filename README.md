# iD2022
Backend api reference:
You will find the endpoints listed in /helpers/endpoints.js
Content-Type: application/json for all requests

````javascript
  login: { 
          POST: {
              data: {username<String>, password<String>},
              returns: [{'detail': 'Logged in', status: 200}, // + HTTPonly sessionid
                        {'detail': 'error message', status:403}, ],
                },
          },
          
  logout: { 
          GET: {
              returns:{'detail': 'Logged out'}, // + deletes the sessionid cookie
              },
          },
          
  register: { 
          POST: {
              data: {username<String>, password<String>, password2<String>, email<String>, first_name<String>, last_name<String>},
              returns: [{status: 201}, 
                        {'detail': 'error message', status:400}, ]
                },
          },
          
          
  changePassword: { 
          POST: {
              data: {old_password<String>, password<String>, password2<String>},
              returns: [{status: 201}, 
                        {'detail': 'error message', status:400}, ]
                },
          },
          
          
  csrfToken: {
          GET: {
               returns: {CSRFCoockie}
               }
      },
             
             
  checkAuth:{
          GET: {
               returns: [{'detail': 'Authenticated', status: 200},
                         {'detail': 'Not authenticated', status: 403}]
               }
      },
      
      
  validateEmail: {
          GET: { returns: [{'success', ststus: 200},
                           {"detail": "Validation code already sent. Please check email. You can request another code upon expiration", status: 400}]},
          POST: { data: {validation_code<String>},
                  returns: [{'success', status: 200},
                            {"detail": "Validation code is expired, invalid or was not send. Please try again or request a new code", status: 400},
                           ]},
      },
      
  deleteUser: { 
          POST: {
              data: {password<String>},
              returns: [{'detail': 'success', status: 200}, 
                        {'detail': 'wrong password or unauthorised', status:401},
                        {'detail': 'no such user', status:404 },
                        {'detail': 'error message', status:400}]
                },
          },

  // users
  userList: {
          GET: {
               returns: Array<UserObject>
               },
      },
      
  storyImages: {
          GET: {
               returns: Array[{"image": "url"},]
               },
      },
      
  specificUserStory: {
          GET: {
               returns: Array[{"image": "url"},]
               },
      },
      
  userProfile: {
          GET: {
               returns: {UserObject},
               },
      },
      
  userProfileUpdate: {
          POST: {
               data: {UserObject}
               returns: [{ststus: 200, UserObject},
                         {ststus: 403, "detail": "You don't have permission for this user."}]
               },
      },
      
  currentUserDreams: {
          GET: {
               returns: Array<DreamObject>
               },
      },
      
  userDreams: {
          GET: {
               returns: Array<DreamObject>
               },
      },

  // dreams
  dreamList: {
          GET: {
               returns: Array<DreamObject>
               },
          POST: {
                 data: {DreamObject},
                 returns: [{status: 201, DreamObject},
               },
      },
      
      
  dreamListBookmarked: {
          GET: {
               returns: Array<DreamObject>
               },
      },
      
  dreamSetBookmark: {
          PATCH: {
              returns: {status: 204}
          }
      },
      
  dreamSetProgress: {
          POST: {
               data: {progress<int>}
               returns: [{status: 204},
                         {ststus: 400, 'error': 'Invalid progress value'},
                         {ststus: 403, 'detail': 'Unauthorised'},]
               },
      },
  
  dreamSetLike: {
          PATCH: {
              returns: {status: 204}
          }
      },

  // milestones
  milestoneList: {
          GET: {
               returns: Array<MilestoneObject>
               },
      },
      
  milestoneSetStatus: {
          PATCH: {
              returns: {status: 204}
          }
      },

  // comments
  commentList: {
          GET: {
               returns: Array<CommentObject>
               },
          POST: {
                 data: {CommentObject},
                 returns: [{status: 201, CommentObject},
               },
      },
      
  dreamComments: {
          GET: {
               returns: Array<CommentObject>
               },
      },

  // friends
  userFriends: {
          GET: {
               returns: {UserObject},
               },
      },
      
  friendRequest: {
          POST: {
               data: {id<int>}
               returns: [{status: 204},
                         {ststus: 400, 'detail': 'error message'},
                         {ststus: 404, 'detail': "detail": "User not found"},]
               },
      },
      
  friendRequestAction: {
          POST: {
               data: {id<int>, action<accept/reject>}
               returns: [{status: 204},
                         {ststus: 400, 'detail': 'error message'},
                         {ststus: 404, 'detail': "detail": "User not found"},]
               },
      },
      
  removeFriend: {
          POST: {
               data: {id<int>}
               returns: [{status: 204},
                         {ststus: 400, 'detail': 'error message'},
                         {ststus: 404, 'detail': "detail": "User not found"},]
               },
      },
      
  checkFriendship: {
          GET: {
               returns: [{status: 200, 'is_friend': Boolean},
                         {ststus: 400, 'detail': 'error message'},]
               },
      },
      
  friendRequests: {
          GET: {
               returns: Array<UserObject>
               },
      },

  chatRoom: {
          GET: {
               returns: Array<ChatObject>
               },
      },
      
  issues: {
          POST: {
               data: {text<String>}
               returns: [{status: 204},
                         {status: 400, 'detail': 'error message'},]
               },
      },
      
  notifications: {
          GET: {
               returns: Array<ActionObject>
               },
      },
  wallets: {
          GET: {
               returns: Array<WalletObject>
               },
          POST: {
                 data: {WalletObject},
                 returns: {status: 201, WalletObject},
               },
      },
      
  myWallets:{
          GET: {
               returns: Array<WalletObject>
               },
      },
      
  payment: {
          POST: {
                 data: {CardObject},
                 returns: [{status: 200, 'detail': 'Payment successful'},
                           {status: 400, 'detail': 'error message'},],
               },
      },
````

Objects
````json
"UserObject": {
        "id": 1,
        "user": {
            "id": 1,
            "username": "admin",
            "email": "test@gmail.com",
            "first_name": "test",
            "last_name": "test",
            "is_staff": true,
            "is_active": true
        },
        "profile_photo": "/backend/media/user_profile_photos/profilePhoto_0FQp6l5.png",
        "background_photo": "/backend/media/user_background_photos/backgroundPhoto_xj9Fir0.jpg",
        "location": "Bucharest,",
        "bio": "test",
        "birth_date": "2022-05-03",
        "display_name": "PetruTest",
        "email_valid": true
    },
    
"MilestoneObject": {
                "id": 1,
                "title": "test",
                "user": 1,
                "date": "2022-05-20T17:51:10Z",
                "description": "test",
                "dream": 1,
                "completed": false,
                "funded_by": [],
                "amount_funded": "0.00",
                "amount_required": "0.00"
            }

"DreamObject": {
        "id": 1,
        "title": "Tets",
        "user": UserObject
        "image": "http://192.168.0.104:8000/backend/media/dream_photos/photo1648638314.jpeg",
        "description": "TEst",
        "progress": 58,
        "date_added": "2022-05-20T17:47:55.739431Z",
        "start_date": "2022-06-29T15:20:41.564356Z",
        "end_date": "2022-06-29T15:20:41.564379Z",
        "tags": [
            "test"
        ],
        "total_likes": 2,
        "bookmark": false,
        "like": true,
        "milestones": Array<MilestoneObject>
    },

"CommentObject": {
        "id": 4,
        "user": UserObject
        "comment": "test",
        "date_added": "2022-05-22T10:31:21.050905Z",
        "dream": 1
    },
    
"ChatObject": {
        "id": 1,
        "name": "test123",
        "users": [
            1,
            2
        ]
    },
 
"ActionObject": {
        "id": 17,
        "user": 2,
        "user_display_name": "testUser",
        "verb": "liked dream",
        "target": {
            "title": "Boom Boom wallet test",
            "user": 2
        },
        "created": "2022-09-02T20:09:53.574973Z"
    },
    
"WalletObject": {
        "id": 1,
        "name": "Test Wallet",
        "description": "For testing",
        "created_at": "2022-08-31T16:40:42.906556Z",
        "updated_at": "2022-09-04T17:22:17.325233Z",
        "user": UserObject,
        "amount": "500.00",
        "dreams": Array<DreamObject>
    },
        
````

# iDreamersApp
