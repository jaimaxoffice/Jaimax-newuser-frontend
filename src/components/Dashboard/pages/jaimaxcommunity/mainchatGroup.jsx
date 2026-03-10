
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Users } from 'lucide-react';
import io from 'socket.io-client';
import Cookies from "js-cookie";
import ChatWindow from "./chatWindow.jsx"
import {
    useGetChatFilesQuery,
    // useLazyGetUsersQuery,
    useGetGroupsQuery,
    useUploadFileMutation,
    useUploadAudioMutation,
    useSendPublicKeyMutation,
    useGetAllUsersQuery
} from "./chatgroup.js";

import { encryptMessage, decryptMessage } from './encryptmsg.js';
import { sanitizeMessage } from './sanitize.js';
import Loader from '../../../../ReusableComponents/Loader/loader.jsx';
import { ToastContainer, toast } from '../../../../ReusableComponents/Toasts/Toasts.jsx';
const GroupChatApp = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [showMembers, setShowMembers] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: "", name: "" });
    const [typingUsers, setTypingUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [showClearChatModal, setShowClearChatModal] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [showFilePreview, setShowFilePreview] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [playingAudio, setPlayingAudio] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showFilesPanel, setShowFilesPanel] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [socketInitialized, setSocketInitialized] = useState(false);
    const [ReadInfo, setReadInfo] = useState(false)
    const [replyToMessage, setReplyToMessage] = useState(null);
    const [encryptedKey, setencryptedKey] = useState(null)
    const [DecryptedKey, setdecryptedKey] = useState([])
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const rateLimitResetTimer = useRef(null);
    const [activeGroupTab, setActiveGroupTab] = useState('overview');

    const socketUrl = import.meta.env.VITE_SOCKET_URL;


    const [PrivateKey, setPrivateKey] = useState(null)
    const [isDeletingMessage, setIsDeletingMessage] = useState(false);
    const [showFileTypeModal, setShowFileTypeModal] = useState(false);
    const [status, setstatus] = useState(false)
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true); // ✅ Start as loading
    const [isInitialMessagesLoad, setIsInitialMessagesLoad] = useState(true);
    const [userPage, setUserPage] = useState(1);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoadingMoreUsers, setIsLoadingMoreUsers] = useState(false);

    const hasAutoSelectedRef = useRef(false);

    // Refs

    const processedMessagesRef = useRef(new Set());
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recordingIntervalRef = useRef(null);
    const audioPlayerRef = useRef({});
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const fileInputRef = useRef(null);
    const emojiPickerRef = useRef(null);




    // Add these new state variables (around line 50)
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [imageCaption, setImageCaption] = useState('');
    const [documentCaption, setDocumentCaption] = useState('');
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [showDocumentPreview, setShowDocumentPreview] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);



    const [parsedCookies, setparsedCookies] = useState(null)

    const [hasMoreOldMessages, setHasMoreOldMessages] = useState(true);
    const [hasMoreNewMessages, setHasMoreNewMessages] = useState(false);
    const [isLoadingOlder, setIsLoadingOlder] = useState(false);
    const [isLoadingNewer, setIsLoadingNewer] = useState(false);
    const [oldestMessageTimestamp, setOldestMessageTimestamp] = useState(null);
    const [newestMessageTimestamp, setNewestMessageTimestamp] = useState(null);

    const [displayedUsers, setDisplayedUsers] = useState([]); // Only current 10 users
    // const [userPage, setUserPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const isLoadingUsersRef = useRef(false); // Prevent duplicate calls
    const lastScrollDirection = useRef(null);


    const { data: fetchedGroups = [] } = useGetGroupsQuery();

    const { data: userDetails } = useGetAllUsersQuery();


    useEffect(() => {
        if (userDetails) {
            setTotalUsers(userDetails.data.toatlUsers);
        }
    }, [userDetails]);






    const shouldFetchFiles = (activeGroupTab === 'media' || activeGroupTab === 'files') && !!selectedGroup?.chatId;

    const { data: chatFilesData = [], isLoading: loadingFiles, refetch: refetchFiles } = useGetChatFilesQuery(
        selectedGroup?.chatId,
        {
            skip: !selectedGroup?.chatId,
        }
    );


    const chatFiles = chatFilesData?.data || chatFilesData || [];

    const [sendPublicKey, { isLoading, isSuccess, isError }] = useSendPublicKeyMutation();
    // const [fetchUsers, { isLoading: isLoadingUsersAPI, error: usersError }] = useLazyGetUsersQuery();


    const [uploadFile, { isLoading: uploadingFile }] = useUploadFileMutation();
    const [uploadAudio, { isLoading: uploadingAudio }] = useUploadAudioMutation();

    const Allusers = useMemo(() => displayedUsers, [displayedUsers]);


    const SECRET_KEY = import.meta.env.VITE_APP_CHATSECRETKEY?.trim()



    const userDetail = Cookies.get("userData");

    if (userDetail) {
        const parsedUser = JSON.parse(userDetail);
    }




    // useEffect(() => {
    //     if (selectedGroup) {
    //         fetchUsers({ page: 1, limit: 10 });
    //         setUserPage(1);
    //     }
    // }, [selectedGroup?.id]);


    // const loadMoreUsers = async () => {
    //     if (isLoadingMoreUsers || !hasMoreUsers) return;

    //     setIsLoadingMoreUsers(true);
    //     const nextPage = userPage + 1;

    //     try {
    //         const result = await fetchUsers({ page: nextPage, limit: 10 }).unwrap();
    //         setUserPage(nextPage);
    //         setHasMoreUsers(result.hasMore);
    //     } catch (error) {
    //         console.error("Failed to load more users:", error);
    //     } finally {
    //         setIsLoadingMoreUsers(false);
    //     }
    // };

    useEffect(() => {

        try {
            const data = Cookies.get("userData");

            if (data) {
                const parsedData = JSON.parse(data);

                const userData = {
                    id: parsedData?.username || "",
                    name: parsedData?.name || "",
                    userregisteredDate: parsedData?.registeredDate
                };

                setCurrentUser(userData);
            } else {
                console.log(" No userData cookie found");
            }
        } catch (error) {
            console.error(" Error reading userData from cookies:", error);
        }
    }, []);

    // const fetchUsersPage = async (page) => {
    //     if (isLoadingUsersRef.current) {
    //         return;
    //     }

    //     if (page < 1 || (totalPages > 0 && page > totalPages)) {
    //         return;
    //     }

    //     isLoadingUsersRef.current = true;
    //     setIsLoadingUsers(true);


    //     try {
    //         const result = await fetchUsers({
    //             page,
    //             limit: 10,
    //             chatId: selectedGroup.chatId
    //         }).unwrap();


    //         setDisplayedUsers(result.users || []);
    //         setUserPage(page);
    //         setTotalPages(result.pagination?.totalPages || 1);

    //     } catch (error) {
    //         console.error("Failed to fetch users:", error);
    //     } finally {
    //         setIsLoadingUsers(false);
    //         isLoadingUsersRef.current = false;
    //     }
    // };
    // useEffect(() => {
    //     if (!selectedGroup) return;

    //     fetchUsersPage(1);
    // }, [selectedGroup?.id]);

    const loadNextPage = () => {
        if (userPage < totalPages && !isLoadingUsers) {
            fetchUsersPage(userPage + 1);
        }
    };

    const loadPrevPage = () => {
        if (userPage > 1 && !isLoadingUsers) {
            fetchUsersPage(userPage - 1);
        }
    };




    useEffect(() => {
        setDisplayedUsers([]);
        setUserPage(1);

        setTotalPages(1);
        setIsLoadingUsers(false);
        isLoadingUsersRef.current = false;
        lastScrollDirection.current = null;
    }, [selectedGroup?.chatId]);



    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(f => ({
            file: f,
            preview: URL.createObjectURL(f),
            name: f.name,
            size: f.size
        }));

        setSelectedImages(prev => {
            const existing = prev && prev.length > 0 ? prev : [];

            if (existing.length >= 5) {
                toast.error('Maximum 5 images allowed');
                return existing;
            }

            const remaining = 5 - existing.length;
            if (newImages.length > remaining) {
                toast.error(`You can only add ${remaining} more image${remaining === 1 ? '' : 's'}`);
                return [...existing, ...newImages.slice(0, remaining)];
            }

            return [...existing, ...newImages];
        });

        setShowImagePreview(true);
    };



    const handleDocumentSelect = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.size > 100 * 1024 * 1024) {
            return;
        }

        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'application/zip',
            'application/x-rar-compressed'
        ];

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar)$/i)) {
            return;
        }

        const documentObject = {
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            icon: getFileIcon(file.name)
        };

        setSelectedDocument(documentObject);
        setShowDocumentPreview(true);
        setDocumentCaption('');
    };






    const connectSocket = () => {
        console.log("trigggred123")
        try {
            if (socketRef.current) {
                socketRef.current.removeAllListeners();
                socketRef.current.disconnect();
                socketRef.current = null;

            }


            socketRef.current = io(socketUrl, {
                transports: ['websocket'],
                query: {
                    userId: currentUser.id,
                    date: currentUser.userregisteredDate
                },

            });


            socketRef.current.on("connect", () => {
                setSocketConnected(true);
            });

            socketRef.current.on("disconnect", () => {
                setSocketConnected(false);
            });

            socketRef.current.on("online_users", (users) => {
                setOnlineUsers(users);
            });


            socketRef.current.on('user:typing', (data) => {

                if (data.userId !== currentUser.id) {
                    setTypingUsers(prev => {
                        const exists = prev.some(u => u.userId === data.userId);
                        if (exists) return prev;

                        return [...prev, {
                            userId: data.userId,
                            userName: data.userName || 'Someone'
                        }];
                    });
                }
            });




            socketRef.current.on('new_message', async (data) => {


                const messageId = data._id?.toString() || data.msgId;

                if (!messageId) {
                    return;
                }

                if (processedMessagesRef.current.has(messageId)) {
                    return;
                }

                let decryptedMessage = data.msgBody?.message;
                if (decryptedMessage && typeof decryptedMessage === 'object' && decryptedMessage.cipherText) {
                    try {
                        decryptedMessage = await decryptMessage(decryptedMessage, SECRET_KEY);
                    } catch (err) {
                        decryptedMessage = "[Decryption failed]";
                    }
                } else if (typeof decryptedMessage !== 'string') {
                    decryptedMessage = String(decryptedMessage || '');
                }

                const messageObject = {
                    ...data,
                    _id: data._id,
                    msgId: messageId,
                    msgBody: {
                        ...data.msgBody,
                        message: decryptedMessage,
                        media: data.msgBody?.media ? {
                            ...data.msgBody.media,
                            is_uploading: false,
                            file_url: data.msgBody.media.file_url
                        } : undefined
                    }
                };

                const isMyMessage = data.fromUserId === currentUser.id;


                if (isMyMessage) {
                    setMessages(prev => {
                        const tempIndex = prev.findIndex(msg =>
                            msg.correlationId &&
                            data.correlationId &&
                            msg.correlationId === data.correlationId &&
                            msg.msgId?.startsWith('temp_')
                        );

                        if (tempIndex !== -1) {
                            processedMessagesRef.current.add(messageId);

                            const updated = [...prev];
                            updated[tempIndex] = {
                                ...messageObject,
                                msgStatus: "sent",
                                status: "sent",
                                metaData: {
                                    ...messageObject.metaData,
                                    isSent: true,
                                    sentAt: data.timestamp,
                                    isDelivered: false,
                                }
                            };
                            return updated;
                        }

                        const alreadyExists = prev.some(msg => {
                            const existingId = msg._id?.toString() || msg.msgId;
                            return existingId === messageId;
                        });

                        if (alreadyExists) {
                            processedMessagesRef.current.add(messageId);
                            return prev;
                        }

                        // Add as new
                        processedMessagesRef.current.add(messageId);
                        return [...prev, messageObject];
                    });

                } else {

                    setMessages(prev => {
                        // Check if already exists
                        const alreadyExists = prev.some(msg => {
                            const existingId = msg._id?.toString() || msg.msgId;
                            return existingId === messageId;
                        });

                        if (alreadyExists) {
                            processedMessagesRef.current.add(messageId);
                            return prev;
                        }


                        processedMessagesRef.current.add(messageId);
                        return [...prev, messageObject];
                    });

                    if (selectedGroup && data.chatId === selectedGroup.chatId) {
                        if (socketRef.current?.connected) {
                            setTimeout(() => {
                                socketRef.current.emit('message_read', {
                                    chatId: data.chatId,
                                    messageId: data._id,
                                    userId: currentUser.id
                                });
                            }, 500);
                        }
                    } else {
                        showNotification(data);
                    }
                }

                updateGroupLastMessage(messageObject);
            });



            // Around line 820 in your frontend code
            socketRef.current.on("message_deleted_for_everyone", ({ msgId, userId, chatId }) => {

                // Only update if it's from another user (not yourself - you already updated optimistically)
                if (userId !== currentUser.id) {
                    setMessages(prev =>
                        prev.map(msg => {
                            const messageId = msg.msgId || msg._id?.toString() || msg.id;
                            if (messageId === msgId) {
                                return {
                                    ...msg,
                                    deletedForEveryone: true,
                                    msgBody: {
                                        ...msg.msgBody,
                                        message: "This message was deleted"
                                    }
                                };
                            }
                            return msg;
                        })
                    );
                }
            });
            socketRef.current.on('user:stop-typing', (data) => {
                setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
            });

            socketRef.current.on("report_received", (data) => {

                if (data.success) {
                    console.log("Report submitted successfully");
                }
            });

            socketRef.current.on("clear_chat_success", ({ chatId, userId }) => {

                if (selectedGroup?.chatId === chatId && userId === currentUser.id) {
                    // Clear messages immediately
                    setMessages([]);

                    // Reset pagination states
                    setHasMoreOldMessages(false);
                    setHasMoreNewMessages(false);
                    setOldestMessageTimestamp(null);
                    setNewestMessageTimestamp(null);
                }

                // Update last message in sidebar
                setGroups(prev => prev.map(g => {
                    if (g.chatId === chatId) {
                        return {
                            ...g,
                            lastMessage: '',
                            time: '',
                            unread: 0
                        };
                    }
                    return g;
                }));
            });



            socketRef.current.on("file_upload_progress", ({ correlationId, progress }) => {

                setUploadProgress(progress);

                setMessages(prev => prev.map(msg => {
                    if (msg.correlationId === correlationId) {
                        return {
                            ...msg,
                            uploadProgress: progress
                        };
                    }
                    return msg;
                }));
            });




            socketRef.current.on("file_upload_success", async (savedMessage) => {


                const messageId = savedMessage._id?.toString() || savedMessage.msgId;
                const isMyMessage = savedMessage.fromUserId === currentUser.id;


                // Decrypt caption if needed
                let decryptedMessage = savedMessage.msgBody?.message;
                if (decryptedMessage && typeof decryptedMessage === 'object' && decryptedMessage.cipherText) {
                    try {
                        decryptedMessage = await decryptMessage(decryptedMessage, SECRET_KEY);
                    } catch (err) {
                        decryptedMessage = "[Decryption failed]";
                    }
                } else if (typeof decryptedMessage !== 'string') {
                    decryptedMessage = String(decryptedMessage || '');
                }

                const messageObject = {
                    ...savedMessage,
                    _id: savedMessage._id,
                    msgId: messageId,
                    msgStatus: "sent",
                    status: "sent",
                    msgBody: {
                        ...savedMessage.msgBody,
                        message: decryptedMessage,
                        media: {
                            ...savedMessage.msgBody.media,
                            is_uploading: false,
                            tempPreview: undefined
                        }
                    },
                    metaData: {
                        ...savedMessage.metaData,
                        isSent: true,
                        sentAt: savedMessage.timestamp
                    }
                };

                if (isMyMessage) {
                    // MY UPLOAD - Replace temp message

                    setMessages(prev =>
                        prev.map(msg => {
                            if (
                                msg.msgId === savedMessage.tempId ||
                                msg.correlationId === savedMessage.correlationId
                            ) {
                                return messageObject;
                            }
                            return msg;
                        })
                    );

                } else {
                    // OTHER USER'S UPLOAD - Add as new message

                    setMessages(prev => {
                        // Check if already exists
                        const alreadyExists = prev.some(msg => {
                            const existingId = msg._id?.toString() || msg.msgId;
                            return existingId === messageId;
                        });

                        if (alreadyExists) {
                            return prev;
                        }



                        return [...prev, messageObject];
                    });

                    // Mark as read if in current chat
                    if (selectedGroup && savedMessage.chatId === selectedGroup.chatId) {
                        if (socketRef.current?.connected) {
                            setTimeout(() => {
                                socketRef.current.emit('message_read', {
                                    chatId: savedMessage.chatId,
                                    messageId: savedMessage._id,
                                    userId: currentUser.id
                                });
                            }, 500);
                        }
                    } else {
                        showNotification(savedMessage);
                    }
                }

                processedMessagesRef.current.add(messageId);
                updateGroupLastMessage(messageObject);
                setUploadProgress(0);
            });

            // 3. FILE UPLOAD ERROR
            socketRef.current.on("file_upload_error", ({
                tempId,
                correlationId,
                error
            }) => {

                setMessages(prev => prev.map(msg => {
                    if (msg.msgId === tempId || msg.correlationId === correlationId) {
                        return {
                            ...msg,
                            status: "failed",
                            msgStatus: "failed",
                            msgBody: {
                                ...msg.msgBody,
                                media: {
                                    ...msg.msgBody.media,
                                    is_uploading: false
                                }
                            },
                            error: error
                        };
                    }
                    return msg;
                }));

                setUploadProgress(0);
            });

            // 4. NEW FILE MESSAGE FROM OTHERS
            socketRef.current.on('new_file_message', async (data) => {

                // Add the file message to UI
                const messageObject = {
                    ...data,
                    _id: data._id,
                    msgId: data.msgId || data._id?.toString(),
                    msgBody: {
                        ...data.msgBody,
                        media: {
                            ...data.msgBody.media,
                            is_uploading: false,
                        }
                    }
                };

                setMessages(prev => [...prev, messageObject]);
            });


            socketRef.current.on("clear_chat_error", ({ error }) => {
                console.error("Clear chat error:", error);
            });

            socketRef.current.on('load_older_messages', async (data) => {
                const { messages: olderMessages, hasMore } = data;

                if (olderMessages && olderMessages.length > 0) {
                    const decryptedMessages = await Promise.all(
                        olderMessages.map(async (msg) => {
                            let decryptedMessage = msg.msgBody?.message;

                            if (decryptedMessage && typeof decryptedMessage === 'object' && decryptedMessage.cipherText) {
                                try {
                                    decryptedMessage = await decryptMessage(decryptedMessage, SECRET_KEY);
                                } catch (err) {
                                    decryptedMessage = "[Decryption failed]";
                                }
                            } else if (typeof decryptedMessage !== 'string') {
                                decryptedMessage = String(decryptedMessage || '');
                            }

                            return {
                                ...msg,
                                _id: msg._id || msg.msgId,
                                msgId: msg.msgId || msg._id?.toString(),
                                msgBody: {
                                    ...msg.msgBody,
                                    message: decryptedMessage
                                }
                            };
                        })
                    );

                    const filteredMessages = decryptedMessages.filter(msg => {
                        if (!msg.deletedFor || !Array.isArray(msg.deletedFor)) {
                            return true;
                        }

                        const currentUserId = currentUser?.id?.toString();
                        return !msg.deletedFor.some(userId =>
                            userId?.toString() === currentUserId
                        );
                    });

                    setMessages(prev => {
                        const existingIds = new Set(prev.map(m => m.msgId || m._id?.toString()));
                        const newMessages = filteredMessages.filter(
                            m => !existingIds.has(m.msgId || m._id?.toString())
                        );

                        return [...newMessages, ...prev];
                    });

                    setOldestMessageTimestamp(olderMessages[0].timestamp);
                    setHasMoreOldMessages(hasMore);
                } else {
                    setHasMoreOldMessages(false);
                }

                setIsLoadingOlder(false);
            });

            socketRef.current.on('load_newer_messages', async (data) => {
                const { messages: newerMessages, hasMore } = data;

                if (newerMessages && newerMessages.length > 0) {
                    const decryptedMessages = await Promise.all(
                        newerMessages.map(async (msg) => {
                            let decryptedMessage = msg.msgBody?.message;

                            if (decryptedMessage && typeof decryptedMessage === 'object' && decryptedMessage.cipherText) {
                                try {
                                    decryptedMessage = await decryptMessage(decryptedMessage, SECRET_KEY);
                                } catch (err) {
                                    decryptedMessage = "[Decryption failed]";
                                }
                            } else if (typeof decryptedMessage !== 'string') {
                                decryptedMessage = String(decryptedMessage || '');
                            }

                            return {
                                ...msg,
                                _id: msg._id || msg.msgId,
                                msgId: msg.msgId || msg._id?.toString(),
                                msgBody: {
                                    ...msg.msgBody,
                                    message: decryptedMessage
                                }
                            };
                        })
                    );

                    const filteredMessages = decryptedMessages.filter(msg => {
                        if (!msg.deletedFor || !Array.isArray(msg.deletedFor)) {
                            return true;
                        }

                        const currentUserId = currentUser?.id?.toString();
                        return !msg.deletedFor.some(userId =>
                            userId?.toString() === currentUserId
                        );
                    });

                    setMessages(prev => {
                        const existingIds = new Set(prev.map(m => m.msgId || m._id?.toString()));
                        const newMessages = filteredMessages.filter(
                            m => !existingIds.has(m.msgId || m._id?.toString())
                        );

                        return [...prev, ...newMessages];
                    });

                    setNewestMessageTimestamp(newerMessages[newerMessages.length - 1].timestamp);
                    setHasMoreNewMessages(hasMore);
                } else {
                    setHasMoreNewMessages(false);
                }

                setIsLoadingNewer(false);
            });


            socketRef.current.on('chat_history', async ({ chatId, messages: chatMessages }) => {
                if (window.currentLoadingTimeout) {
                    clearTimeout(window.currentLoadingTimeout);
                    window.currentLoadingTimeout = null;
                }
                setIsLoadingMessages(false);

                const formattedMessages = await Promise.all(
                    chatMessages.map(async (msg) => {
                        let decryptedMessage = msg.msgBody?.message;

                        if (decryptedMessage && typeof decryptedMessage === 'object' && decryptedMessage.cipherText) {
                            try {
                                decryptedMessage = await decryptMessage(decryptedMessage, SECRET_KEY);
                            } catch (err) {
                                decryptedMessage = "[Encrypted message]";
                            }
                        }

                        if (typeof decryptedMessage !== 'string') {
                            decryptedMessage = String(decryptedMessage || '');
                        }

                        return {
                            ...msg,
                            _id: msg._id || msg.msgId,
                            msgId: msg.msgId || msg._id?.toString(),
                            msgBody: {
                                ...msg.msgBody,
                                message: decryptedMessage
                            }
                        };
                    })
                );

                const filteredMessages = formattedMessages.filter(msg => {
                    if (msg.deletedFor && Array.isArray(msg.deletedFor)) {
                        const currentUserId = currentUser?.id?.toString();
                        const isDeletedForMe = msg.deletedFor.some(userId =>
                            userId?.toString() === currentUserId
                        );
                        return !isDeletedForMe;
                    }
                    return true;
                });

                setMessages(filteredMessages);
                setIsLoadingMessages(false);
                setIsInitialMessagesLoad(false);

                if (filteredMessages.length > 0) {
                    setOldestMessageTimestamp(filteredMessages[0].timestamp);
                    setNewestMessageTimestamp(filteredMessages[filteredMessages.length - 1].timestamp);
                    setHasMoreOldMessages(filteredMessages.length >= 50);
                    setHasMoreNewMessages(false);
                } else {
                    setHasMoreOldMessages(false);
                    setHasMoreNewMessages(false);
                }
            });




            socketRef.current.on("message:read:update", (data) => {
                const { msgId, readBy } = data;

                setMessages(prev =>
                    prev.map(msg => {
                        if (msg.msgId === msgId || msg._id?.toString() === msgId) {
                            return {
                                ...msg,
                                metaData: {
                                    ...msg.metaData,
                                    readBy: readBy || [],
                                    isRead: readBy && readBy.length > 0
                                }
                            };
                        }
                        return msg;
                    })
                );
            });

            socketRef.current.on("delete_for_everyone", ({ msgId, userId }) => {

                if (userId !== currentUser.id) {
                    setMessages(prev =>
                        prev.map(msg => {
                            const messageId = msg.msgId || msg._id?.toString() || msg.id;
                            if (messageId === msgId) {
                                return {
                                    ...msg,
                                    deletedForEveryone: true,
                                    msgBody: {
                                        ...msg.msgBody,
                                        message: "This message was deleted"
                                    }
                                };
                            }
                            return msg;
                        })
                    );
                }
            });

            socketRef.current.on("delete_error", ({ error, msgId }) => {

                setIsDeletingMessage(false);
            });


            socketRef.current.on('send_message', async (data) => {

                const messageId = data._id?.toString() || data.msgId;

                if (!messageId || processedMessagesRef.current.has(messageId)) {
                    return;
                }

                let decryptedMessage = data.msgBody?.message;
                if (decryptedMessage && typeof decryptedMessage === 'object' && decryptedMessage.cipherText) {
                    try {
                        decryptedMessage = await decryptMessage(decryptedMessage, SECRET_KEY);
                    } catch (err) {
                        decryptedMessage = "[Decryption failed]";
                    }
                } else if (typeof decryptedMessage !== 'string') {
                    decryptedMessage = String(decryptedMessage || '');
                }

                const messageObject = {
                    ...data,
                    _id: data._id,
                    msgId: messageId,
                    msgBody: {
                        ...data.msgBody,
                        message: decryptedMessage
                    }
                };

                const isMyMessage = data.fromUserId === currentUser.id;

                if (isMyMessage) {
                    setMessages(prev => {
                        const tempIndex = prev.findIndex(msg =>
                            msg.correlationId &&
                            data.correlationId &&
                            msg.correlationId === data.correlationId &&
                            msg.msgId?.startsWith('temp_')
                        );

                        if (tempIndex !== -1) {
                            processedMessagesRef.current.add(messageId);

                            const updated = [...prev];
                            updated[tempIndex] = {
                                ...messageObject,
                                msgStatus: "sent",
                                status: "sent",
                                metaData: {
                                    ...messageObject.metaData,
                                    isSent: true,
                                    sentAt: data.timestamp,
                                    isDelivered: false,
                                }
                            };
                            return updated;
                        }

                        const alreadyExists = prev.some(msg => {
                            const existingId = msg._id?.toString() || msg.msgId;
                            return existingId === messageId;
                        });

                        if (alreadyExists) {
                            processedMessagesRef.current.add(messageId);
                            return prev;
                        }

                        processedMessagesRef.current.add(messageId);
                        return [...prev, messageObject];
                    });

                } else {
                    setMessages(prev => {
                        const alreadyExists = prev.some(msg => {
                            const existingId = msg._id?.toString() || msg.msgId;
                            return existingId === messageId;
                        });

                        if (alreadyExists) {
                            processedMessagesRef.current.add(messageId);
                            return prev;
                        }

                        processedMessagesRef.current.add(messageId);
                        return [...prev, messageObject];
                    });
                }

                updateGroupLastMessage(messageObject);
            });

            socketRef.current.on("message_saved_confirmation", ({ tempId, correlationId, _id, msgId }) => {

                setMessages(prev =>
                    prev.map(msg => {
                        if (msg.correlationId === correlationId || msg.msgId === tempId) {
                            return {
                                ...msg,
                                _id: _id,
                                msgId: msgId,
                                dbSaved: true
                            };
                        }
                        return msg;
                    })
                );
            });




            socketRef.current.on("send_message_error", ({ error, tempId, correlationId, msgId }) => {

                const isRateLimitError =
                    error?.toLowerCase().includes('rate limit') ||
                    error?.toLowerCase().includes('too many') ||
                    error?.toLowerCase().includes('slow down') ||
                    error?.toLowerCase().includes('wait');

                if (isRateLimitError) {

                    // ✅  the message from UI immediately
                    setMessages(prev => prev.filter(msg => {
                        const matchesTemp = msg.msgId === tempId || msg.correlationId === correlationId;
                        const matchesId = msg.msgId === msgId || msg._id?.toString() === msgId;
                        return !(matchesTemp || matchesId); // Remove if it matches
                    }));

                    // Disable input
                    setIsInputDisabled(true);

                    // Clear any existing timer
                    if (rateLimitResetTimer.current) {
                        clearTimeout(rateLimitResetTimer.current);
                    }

                    // Re-enable after 1 minute (60000ms)
                    rateLimitResetTimer.current = setTimeout(() => {
                        setIsInputDisabled(false);
                    }, 60000);




                    return;
                }

                setMessages(prev => prev.map(msg => {
                    const matchesTemp = msg.msgId === tempId || msg.correlationId === correlationId;
                    const matchesId = msg.msgId === msgId || msg._id?.toString() === msgId;

                    if (matchesTemp || matchesId) {
                        return {
                            ...msg,
                            status: "failed",
                            msgStatus: "failed",
                            error: error
                        };
                    }
                    return msg;
                }));
            });

            socketRef.current.on("update_message_status", (msgUpdate) => {
                const { msgId, metaData, msgStatus } = msgUpdate;

                setMessages(prev =>
                    prev.map(msg => {
                        if (msg.msgId === msgId || msg._id?.toString() === msgId) {
                            return {
                                ...msg,
                                metaData: { ...msg.metaData, ...metaData },
                                msgStatus: msgStatus
                            };
                        }
                        return msg;
                    })
                );
            });




        } catch (err) {
            setSocketConnected(false);
        }
    };






    const sendImageMessage = async () => {
        if (selectedImages.length === 0 || !selectedGroup || !currentUser.id) return;

        const timestamp = Date.now();

        // Send each image separately (WhatsApp style)
        for (let i = 0; i < selectedImages.length; i++) {
            const imageObj = selectedImages[i];
            const tempId = `temp_img_${timestamp}_${i}_${Math.random().toString(36).substr(2, 9)}`;
            const correlationId = `${currentUser.id}_img_${timestamp}_${i}_${Math.random().toString(36).substr(2, 9)}`;

            // Sanitize caption
            const sanitizedCaption = imageCaption.trim() ? sanitizeMessage(imageCaption.trim()) : '';

            // Create temp message
            const messageData = {
                rowId: tempId,
                msgId: tempId,
                correlationId,
                chatId: selectedGroup.chatId,
                chatType: "groupChat",
                messageType: "image",
                senderId: currentUser.id,
                fromUserId: currentUser.id,
                publisherName: currentUser.name,
                senderName: currentUser.name,
                receiverId: "",
                msgBody: {
                    message: sanitizedCaption,
                    originalText: sanitizedCaption,
                    message_type: "image",
                    media: {
                        fileName: imageObj.name,
                        file_type: imageObj.file.type,
                        file_size: imageObj.size,
                        file_url: imageObj.preview,
                        tempPreview: imageObj.preview,
                        file_key: "",
                        duration: "",
                        caption: sanitizedCaption,
                        thumb_image: imageObj.preview,
                        local_path: "",
                        is_uploading: true,
                        is_downloaded: false,
                        isLargeFile: imageObj.size > 25 * 1024 * 1024,
                    },
                    UserName: currentUser.name,
                },
                msgStatus: "pending",
                timestamp,
                createdAt: new Date(),
                deleteStatus: 0,
                status: "pending",
                favouriteStatus: 0,
                editedStatus: 0,
                editMessageId: "",
                metaData: {
                    isSent: false,
                    sentAt: null,
                    isDelivered: false,
                    deliveredAt: null,
                    isRead: false,
                    readAt: null,
                },
                replyTo: replyToMessage ? {
                    msgId: replyToMessage.msgId || replyToMessage.id,
                    message: replyToMessage.msgBody?.message,
                    senderName: replyToMessage.publisherName || replyToMessage.senderName,
                    senderId: replyToMessage.fromUserId
                } : null,
            };

            setMessages(prev => [...prev, messageData]);

            try {
                const buffer = await imageObj.file.arrayBuffer();

                if (socketRef.current?.connected) {

                    // Send via socket
                    socketRef.current.emit("send_file", {
                        fileBuffer: buffer,
                        fileName: imageObj.name,
                        fileType: imageObj.file.type,
                        caption: sanitizedCaption,
                        messageData
                    });

                } else {
                    throw new Error("Socket not connected");
                }
            } catch (error) {

                // Show error state
                setMessages(prev => prev.map(msg =>
                    msg.msgId === tempId ? {
                        ...msg,
                        status: "failed",
                        msgStatus: "failed",
                        msgBody: {
                            ...msg.msgBody,
                            media: {
                                ...msg.msgBody.media,
                                is_uploading: false
                            }
                        },
                        error: error.message
                    } : msg
                ));
            }
        }

        cancelImageUpload();
        setReplyToMessage(null);
    };

    const sendDocumentMessage = async () => {
        if (!selectedDocument || !selectedGroup || !currentUser.id) return;

        const tempId = `temp_doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const correlationId = `${currentUser.id}_doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Sanitize caption
        const sanitizedCaption = documentCaption.trim() ? sanitizeMessage(documentCaption.trim()) : '';

        // Create temp message
        const messageData = {
            rowId: tempId,
            msgId: tempId,
            _id: tempId,
            correlationId,
            chatId: selectedGroup.chatId,
            chatType: "groupChat",
            messageType: "document",
            senderId: currentUser.id,
            fromUserId: currentUser.id,
            publisherName: currentUser.name,
            senderName: currentUser.name,
            receiverId: "",
            msgBody: {
                message: selectedDocument.name,
                originalText: selectedDocument.name,
                message_type: "document",
                media: {
                    fileName: selectedDocument.name,
                    file_type: selectedDocument.type,
                    file_size: selectedDocument.size,
                    file_url: "",
                    file_key: "",
                    duration: "",
                    caption: sanitizedCaption,
                    thumb_image: "",
                    local_path: "",
                    is_uploading: true,
                    is_downloaded: false,
                    isLargeFile: selectedDocument.size > 25 * 1024 * 1024,
                    fileIcon: selectedDocument.icon
                },
                UserName: currentUser.name,
            },
            msgStatus: "pending",
            timestamp: Date.now(),
            createdAt: new Date(),
            deleteStatus: 0,
            status: "pending",
            favouriteStatus: 0,
            editedStatus: 0,
            editMessageId: "",
            metaData: {
                isSent: false,
                sentAt: null,
                isDelivered: false,
                deliveredAt: null,
                isRead: false,
                readAt: null,
            },
            replyTo: replyToMessage ? {
                msgId: replyToMessage.msgId || replyToMessage.id,
                message: replyToMessage.msgBody?.message,
                senderName: replyToMessage.publisherName || replyToMessage.senderName,
                senderId: replyToMessage.fromUserId
            } : null,
        };

        // INSTANT UI UPDATE
        setMessages(prev => [...prev, messageData]);

        // Close preview
        cancelDocumentUpload();

        try {
            const buffer = await selectedDocument.file.arrayBuffer();

            if (socketRef.current?.connected) {

                socketRef.current.emit("send_file", {
                    fileBuffer: buffer,
                    fileName: selectedDocument.name,
                    fileType: selectedDocument.type,
                    caption: sanitizedCaption,
                    messageData
                });

            } else {
                throw new Error("Socket not connected");
            }
        } catch (error) {

            setMessages(prev => prev.map(msg =>
                msg.msgId === tempId ? {
                    ...msg,
                    status: "failed",
                    msgStatus: "failed",
                    msgBody: {
                        ...msg.msgBody,
                        media: {
                            ...msg.msgBody.media,
                            is_uploading: false
                        }
                    },
                    error: error.message
                } : msg
            ));

        }

        setReplyToMessage(null);
    };



    const cancelImageUpload = () => {
        selectedImages.forEach(img => {
            URL.revokeObjectURL(img.preview);
        });

        setSelectedImages([]);
        setShowImagePreview(false);
        setImageCaption('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const cancelDocumentUpload = () => {
        setSelectedDocument(null);
        setShowDocumentPreview(false);
        setDocumentCaption('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };


    const removeImage = (index) => {
        setSelectedImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };


    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };
    // Add this handler function (around line 1200, near other handlers)
    const handleClearChat = () => {
        if (!selectedGroup?.chatId) return;


        // Clear messages from state
        setMessages([]);

        // Emit to backend to clear chat history
        if (socketRef.current?.connected) {
            socketRef.current.emit("clear_chat", {
                chatId: selectedGroup.chatId,
                userId: currentUser.id
            });
        }

        // Close modal
        setShowClearChatModal(false);


    };

    const handleTyping = () => {
        setstatus(prev => !prev)

        if (!socketRef.current || !selectedGroup) {
            return;
        }


        socketRef.current.emit('user:typing', {
            chatId: selectedGroup.chatId,
            userId: currentUser.id,
            userName: currentUser.name
        });
        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set timeout to emit stop typing after 2 seconds of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            socketRef.current.emit('user:stop-typing', {
                chatId: selectedGroup.chatId,
                userId: currentUser.id
            });
        }, 2000);
    };

    const sendNotification = async () => {
        try {
            const response = await fetch("http://localhost:3003/api/webpush/send-notification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    userId: "JAIMAX123JI3",
                    title: "Test Notification",
                    body: "This is a dummy notification for testing",
                    url: "/dummy-url"
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Notification sent:", data);
            } else {
                console.error("Notification error:", data);
            }
        } catch (err) {
            console.error("Fetch error sending notification:", err);
        }
    };

    const retryMessage = async (failedMsg) => {

        setMessages(prev => prev.filter(msg => msg.msgId !== failedMsg.msgId));

        const newTempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newCorrelationId = `${currentUser.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const originalText = failedMsg.msgBody?.originalText;
        let messageText;

        if (originalText) {
            messageText = originalText;
        } else {
            const encryptedMsg = failedMsg.msgBody?.message;
            if (typeof encryptedMsg === 'object' && encryptedMsg.cipherText) {
                messageText = await decryptMessage(encryptedMsg, SECRET_KEY);
            } else {
                messageText = String(encryptedMsg);
            }
        }

        const encryptedMessage = await encryptMessage(messageText, SECRET_KEY);

        const newMessageData = {
            ...failedMsg,
            msgId: newTempId,
            _id: newTempId,
            rowId: newTempId,
            correlationId: newCorrelationId,
            timestamp: Date.now(),
            createdAt: new Date().toISOString(),
            msgStatus: "pending",
            status: "pending",
            error: null,
            msgBody: {
                ...failedMsg.msgBody,
                message: encryptedMessage,
                originalText: messageText
            },
            metaData: {
                isSent: false,
                sentAt: null,
                isDelivered: false,
                deliveredAt: null,
                isRead: false,
                readAt: null,
                readBy: []
            }
        };

        setMessages(prev => [...prev, newMessageData]);

        if (socketRef.current?.connected) {
            socketRef.current.emit('send_message', newMessageData);
        } else {
            setMessages(prev => prev.map(msg =>
                msg.msgId === newTempId
                    ? { ...msg, status: "failed", msgStatus: "failed", error: "Not connected to server" }
                    : msg
            ));
        }
    };



    useEffect(() => {


        if (!currentUser.id) {
            return;
        }

        if (socketRef.current?.connected) {
            return;
        }

        connectSocket();
        setSocketInitialized(true);

        return () => {
            if (socketRef.current) {
                socketRef.current.removeAllListeners();
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            setSocketInitialized(false);
        };
    }, [currentUser.id]);




    useEffect(() => {
        if (selectedGroup && Allusers && Allusers.length > 0) {
            setMembers(Allusers);
        }
    }, [Allusers, selectedGroup]);



    const handleReply = (msg) => {
        setReplyToMessage(msg);
    };


    const cancelReply = () => {
        setReplyToMessage(null);
    };


    useEffect(() => {
        if (!fetchedGroups || fetchedGroups.length === 0) return;

        setIsLoadingGroups(true);

        const formatted = fetchedGroups.map((group, index) => ({
            id: index + 1,
            chatId: group.groupId,
            name: group.groupName,
            groupImage: group.groupImage,
            userAllowed: group.userAllowed,
            groupDescription: group.groupDescription,
            lastMessage: group.lastMessage || '',
            time: group.lastMessageTime || '',
            unread: group.unread || 0,
            avatar: "https://res.cloudinary.com/ddefr5owc/image/upload/v1766049897/logo_xwrr9w.png"
        }));

        setGroups(formatted);
        setIsLoadingGroups(false);

        if (
            formatted.length > 0 &&
            !selectedGroup &&
            socketRef.current?.connected &&
            !hasAutoSelectedRef.current
        ) {
            hasAutoSelectedRef.current = true;
            handleGroupSelect(formatted[0]);
        }
    }, [fetchedGroups]);

    useEffect(() => {
        if (
            socketRef.current?.connected &&
            groups.length > 0 &&
            !selectedGroup &&
            !hasAutoSelectedRef.current
        ) {
            hasAutoSelectedRef.current = true;
            handleGroupSelect(groups[0]);
        }
    }, [socketRef.current?.connected, groups.length]);

    useEffect(() => {
        if (selectedGroup) {
            hasAutoSelectedRef.current = true;
        }
    }, [selectedGroup]);

    const loadOlderMessages = () => {
        if (!selectedGroup?.chatId || isLoadingOlder || !hasMoreOldMessages) {
            return;
        }

        setIsLoadingOlder(true);

        if (socketRef.current?.connected) {
            const beforeTimestamp = oldestMessageTimestamp || messages[0]?.timestamp;

            socketRef.current.emit('fetch_older_messages', {
                chatId: selectedGroup.chatId,
                before: beforeTimestamp,
                limit: 50
            });


        } else {
            setIsLoadingOlder(false);
        }
    };

    const loadNewerMessages = () => {
        if (!selectedGroup?.chatId || isLoadingNewer || !hasMoreNewMessages) {

            return;
        }

        setIsLoadingNewer(true);

        if (socketRef.current?.connected) {
            const afterTimestamp = newestMessageTimestamp || messages[messages.length - 1]?.timestamp;

            socketRef.current.emit('fetch_newer_messages', {
                chatId: selectedGroup.chatId,
                after: afterTimestamp,
                limit: 50
            });


        } else {
            setIsLoadingNewer(false);
        }
    };

    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);




    const reportMessage = (reportData) => {

        if (socketRef.current?.connected) {
            // Emit report to backend
            socketRef.current.emit("report_message", reportData);


        } else {
            alert('Unable to submit report. Please check your connection.');
        }
    };



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    useEffect(() => {
        scrollToBottom();
    }, [messages]);



    useEffect(() => {
        if (!selectedGroup?.chatId) return;

        const unreadMessages = messages.filter(
            msg => msg.senderId !== currentUser.id && msg.msgStatus !== "read"
        );
        // console.log(unreadMessages, "unreadMessages")

        unreadMessages.forEach(msg => {
            if (socketRef.current?.connected) {
                socketRef.current.emit("message_read", {
                    msgId: msg.msgId,
                    chatId: msg.chatId
                });
            }
        });
    }, [selectedGroup?.chatId, messages, currentUser.id]);





    const deleteForMe = (msgId) => {
        setIsDeletingMessage(true);

        setMessages(prev =>
            prev.map(msg => {
                const messageId = msg.msgId || msg._id?.toString() || msg.id;
                if (messageId === msgId) {
                    return {
                        ...msg,
                        deletedFor: [...(msg.deletedFor || []), currentUser.id]
                    };
                }
                return msg;
            })
        );

        if (socketRef.current?.connected) {
            socketRef.current.emit("delete_for_me", {
                msgId: msgId,
                userId: currentUser.id,
                chatId: selectedGroup.chatId
            });
        } else {
            setMessages(prev =>
                prev.map(msg => {
                    const messageId = msg.msgId || msg._id?.toString() || msg.id;
                    if (messageId === msgId) {
                        return {
                            ...msg,
                            deletedFor: (msg.deletedFor || []).filter(id => id !== currentUser.id)
                        };
                    }
                    return msg;
                })
            );
        }

        setIsDeletingMessage(false);
    };


    const deleteForEveryone = (msgId) => {
        setIsDeletingMessage(true);

        // ✅ Find the actual message to get its real ID
        const targetMessage = messages.find(msg => {
            const messageId = msg.msgId || msg._id?.toString() || msg.id;
            return messageId === msgId;
        });

        const realMessageId = targetMessage?._id?.toString() || targetMessage?.msgId;

        if (!realMessageId) {
            setIsDeletingMessage(false);
            return;
        }



        setMessages(prev => {
            const updated = prev.map(msg => {
                const messageId = msg.msgId || msg._id?.toString() || msg.id;

                if (messageId === msgId) {
                    return {
                        ...msg,
                        deletedForEveryone: true,
                        msgBody: {
                            ...msg.msgBody,
                            message: "This message was deleted"
                        }
                    };
                }
                return msg;
            });
            return updated;
        });

        if (socketRef.current?.connected) {
            socketRef.current.emit("delete_for_everyone", {
                msgId: realMessageId,
                userId: currentUser.id,
                chatId: selectedGroup.chatId
            });
        } else {
            // Revert optimistic update
            setMessages(prev => prev.map(msg => {
                const messageId = msg.msgId || msg._id?.toString() || msg.id;
                if (messageId === msgId) {
                    return {
                        ...msg,
                        deletedForEveryone: false,
                        msgBody: {
                            ...msg.msgBody,
                            message: targetMessage.msgBody?.message
                        }
                    };
                }
                return msg;
            }));
        }

        setIsDeletingMessage(false);
    };


    const clearChat = () => {
        if (!selectedGroup?.chatId) return;

        const confirmClear = window.confirm(
            `Are you sure you want to clear all messages in ${selectedGroup.name}? This action cannot be undone.`
        );

        if (!confirmClear) return;


        // Optimistically clear messages in UI
        setMessages([]);

        // Emit to backend to mark all messages as deleted for this user
        if (socketRef.current?.connected) {
            socketRef.current.emit("clear_chat", {
                chatId: selectedGroup.chatId,
                userId: currentUser.id
            });
        } else {
            console.error(" Socket not connected");
            // alert("Unable to clear chat. Please check your connection.");
        }
    };


    const updateGroupLastMessage = async (data) => {

        setGroups(prev => prev.map(g => {
            if (g.chatId === data.chatId) {
                const shouldIncrementUnread =
                    selectedGroup?.chatId !== data.chatId &&
                    data.senderId !== currentUser.id;

                let messagePreview = '';

                let messageText = data.msgBody?.message;


                if (typeof messageText === 'object' && messageText !== null && messageText.cipherText) {
                    try {
                        messagePreview = "[New message]";

                        (async () => {
                            try {
                                const decrypted = await decryptMessage(messageText, SECRET_KEY);

                                setGroups(prev2 => prev2.map(g2 => {
                                    if (g2.chatId === data.chatId) {
                                        return {
                                            ...g2,
                                            lastMessage: decrypted.substring(0, 50)
                                        };
                                    }
                                    return g2;
                                }));
                            } catch (err) {
                                console.error(" Failed to decrypt group last message:", err);
                            }
                        })();

                    } catch (err) {
                        messagePreview = "[Encrypted message]";
                    }
                }
                //  Handle already decrypted string
                else if (typeof messageText === 'string') {
                    messagePreview = messageText.substring(0, 50); // Truncate
                }
                // Handle media messages
                else if (data.msgBody?.media?.file_url) {
                    messagePreview = '📎 File';
                } else if (data.msgBody?.media?.fileName) {
                    messagePreview = '📎 ' + data.msgBody.media.fileName;
                } else {
                    messagePreview = 'Message';
                }

                return {
                    ...g,
                    lastMessage: messagePreview,
                    time: formatTime(data.timestamp),
                    unread: shouldIncrementUnread ? g.unread + 1 : g.unread
                };
            }
            return g;
        }));
    };




    const ReadInfoButton = () => {
        setReadInfo(prev => !prev)
    }



    const handleReplyMessage = (msg) => {
        setReplyToMessage(msg);
    };
    const showNotification = (data) => {
        const notification = {
            id: Date.now(),
            chatId: data.chatId,
            senderName: data.senderName,
            message: data.message || 'New message',
            timestamp: data.timestamp
        };

        setNotifications(prev => [notification, ...prev].slice(0, 10));


        playNotificationSound();
    };

    const playNotificationSound = () => {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU+ktbx0H8tBSh+zPLaizsKFGO56+mhUBAMTKXh8bllHAU+ktbx0H8tBSh+zPLaizsKFGO56+mhUBAMTKXh8bllHAU+ktbx0H8tBSh+');
        audio.volume = 0.3;
        audio.play().catch(() => { });
    };




    const handleGroupSelect = (group) => {

        if (!socketRef.current?.connected) {
            return;
        }


        setSelectedGroup(group);
        setShowMembers(false);
        setShowFilesPanel(false);
        setShowNotifications(false);
        setHasMoreOldMessages(true);
        setHasMoreNewMessages(false);
        setIsLoadingOlder(false);
        setIsLoadingNewer(false);
        setOldestMessageTimestamp(null);
        setNewestMessageTimestamp(null);
        setIsLoadingMessages(true);
        setIsInitialMessagesLoad(true);



        const loadingTimeout = setTimeout(() => {
            setIsLoadingMessages(false);
            setIsInitialMessagesLoad(false);
        }, 10000);

        window.currentLoadingTimeout = loadingTimeout;

        if (Allusers && Allusers.length > 0) {
            setMembers(Allusers);
        }

        setGroups(prev => prev.map(g =>
            g.id === group.id ? { ...g, unread: 0 } : g
        ));

        setNotifications(prev => prev.filter(n => n.chatId !== group.chatId));

        if (socketRef.current?.connected) {
            if (selectedGroup && selectedGroup.chatId !== group.chatId) {
                socketRef.current.emit('leave_chat', { chatId: selectedGroup.chatId });
                setMessages([]);
                processedMessagesRef.current.clear();
            }

            socketRef.current.emit('join_chat', { chatId: group.chatId });
        }
    };

    const handleBackToGroups = () => {
        setSelectedGroup(null);
        setTypingUsers([]);
    };




    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            return;
        }

        setSelectedFile(file);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
                setShowFilePreview(true);
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null);
            setShowFilePreview(true);
        }
    };

    const cancelFileUpload = () => {
        setSelectedFile(null);
        setFilePreview(null);
        setShowFilePreview(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };


    const sendFileMessage = async () => {
        if (!selectedFile || !selectedGroup || !currentUser.id) return;

        const tempId = `temp_file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const correlationId = `${currentUser.id}_file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const sanitizedFileName = sanitizeMessage(selectedFile.name.trim());

        if (sanitizedFileName === "") {
            return;
        }


        const encyptedmessage = await encryptMessage(sanitizedFileName, SECRET_KEY);

        let messageData = {
            rowId: tempId,
            msgId: tempId,
            _id: tempId,
            correlationId,
            chatId: selectedGroup.chatId,
            chatType: "groupChat",
            messageType: "file",
            senderId: currentUser.id,
            fromUserId: currentUser.id,
            publisherName: currentUser.name,
            senderName: currentUser.name,
            receiverId: "",
            msgBody: {
                message: encyptedmessage,
                originalText: sanitizedFileName,
                message_type: "file",
                media: {
                    fileName: encyptedmessage,
                    file_type: selectedFile.type,
                    file_size: selectedFile.size,
                    file_url: "",
                    file_key: "",
                    duration: "",
                    caption: "",
                    thumb_image: filePreview || "",
                    local_path: "",
                    is_uploading: true,
                    is_downloaded: false,
                    isLargeFile: selectedFile.size > 25 * 1024 * 1024,
                },
                UserName: currentUser.name,
            },
            msgStatus: "pending",
            timestamp: Date.now(),
            createdAt: new Date(),
            deleteStatus: 0,
            status: "pending",
            favouriteStatus: 0,
            editedStatus: 0,
            editMessageId: "",
            metaData: {
                isSent: false,
                sentAt: null,
                isDelivered: false,
                deliveredAt: null,
                isRead: false,
                readAt: null,
            },
            replyTo: replyToMessage ? {
                msgId: replyToMessage.msgId || replyToMessage.id,
                message: replyToMessage.msgBody?.message,
                senderName: replyToMessage.publisherName || replyToMessage.senderName,
                senderId: replyToMessage.fromUserId
            } : null,
        };

        setMessages(prev => [...prev, messageData]);
        cancelFileUpload();

        try {
            const buffer = await selectedFile.arrayBuffer();

            if (socketRef.current?.connected) {

                socketRef.current.emit("send_file", {
                    fileBuffer: buffer,
                    fileName: sanitizedFileName,
                    fileType: selectedFile.type,
                    messageData
                });

                setTimeout(() => {
                    setMessages(prev => prev.map(msg =>
                        msg.msgId === tempId ? {
                            ...msg,
                            status: "sent",
                            msgStatus: "sent",
                            metaData: {
                                ...msg.metaData,
                                isSent: true,
                                sentAt: Date.now()
                            }
                        } : msg
                    ));
                }, 100);

            } else {
                throw new Error("Socket not connected");
            }
        } catch (error) {

            setMessages(prev => prev.map(msg =>
                msg.msgId === tempId ? {
                    ...msg,
                    status: "failed",
                    msgStatus: "failed",
                    msgBody: {
                        ...msg.msgBody,
                        media: {
                            ...msg.msgBody.media,
                            is_uploading: false
                        }
                    },
                    error: error.message
                } : msg
            ));

        }
    };

    useEffect(() => {
        if (!socketRef.current || !selectedGroup) return;

        const socket = socketRef.current;

        const handleUserTyping = (data) => {

            if (data.chatId === selectedGroup.chatId && data.userId !== currentUser.id) {
                setTypingUsers(prev => {
                    const exists = prev.some(u => u.userId === data.userId);
                    if (exists) return prev;

                    return [...prev, {
                        userId: data.userId,
                        userName: data.userName || 'Someone'
                    }];
                });
            }
        };

        const handleUserStopTyping = (data) => {

            if (data.chatId === selectedGroup.chatId) {
                setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
            }
        };

        socket.on('user:typing', handleUserTyping);
        socket.on('user:stop-typing', handleUserStopTyping);

        return () => {
            socket.off('user:typing', handleUserTyping);
            socket.off('user:stop-typing', handleUserStopTyping);
        };
    }, [selectedGroup?.chatId, currentUser?.id]);



    useEffect(() => {
        return () => {
            if (rateLimitResetTimer.current) {
                clearTimeout(rateLimitResetTimer.current);
            }
        };
    }, []);



    const sendMessage = async () => {


        if (isInputDisabled) {

            // Show visual feedback
            const warningDiv = document.createElement('div');
            warningDiv.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse font-semibold';
            warningDiv.innerHTML = `
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Please wait! You're sending messages too quickly.</span>
                </div>
            `;
            document.body.appendChild(warningDiv);

            setTimeout(() => {
                warningDiv.remove();
            }, 3000);

            return;
        }

        if (!message.trim() || !selectedGroup || !currentUser.id) {
            return;
        }

        const sanitizemessage = sanitizeMessage(message.trim());
        if (sanitizemessage === "") {
            return;
        }

        const timestamp = new Date().toISOString();
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const correlationId = `${currentUser.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const encyptedmessage = await encryptMessage(sanitizemessage, SECRET_KEY);

        const messageData = {
            rowId: tempId,
            chatType: "groupChat",
            originalText: sanitizemessage,
            messageType: "message",
            chatId: selectedGroup.chatId,
            msgId: tempId,
            _id: tempId,
            correlationId,
            createdAt: timestamp,
            fromUserId: currentUser.id,
            publisherName: currentUser.name,
            receiverId: "Jaimax Team",
            ...(replyToMessage && {
                replyTo: {
                    msgId: replyToMessage.msgId || replyToMessage.id,
                    message: replyToMessage.msgBody?.message,
                    senderName: replyToMessage.publisherName || replyToMessage.senderName,
                    senderId: replyToMessage.fromUserId
                }
            }),
            msgBody: {
                message: encyptedmessage,
                originalText: sanitizemessage,
                message_type: "text",
                media: {
                    fileName: "",
                    file_url: "",
                    file_key: "",
                    duration: "",
                    caption: "",
                    file_size: "",
                    thumb_image: "",
                    local_path: "",
                    is_uploading: 0,
                    is_downloaded: 0,
                    isLargeFile: false
                },
                UserName: currentUser.name
            },
            msgStatus: "pending",
            timestamp: new Date(timestamp).getTime(),
            deleteStatus: 0,
            userId: currentUser.id,
            status: "pending",
            error: null,
            msgType: "text",
            metaData: {
                isSent: false,
                sentAt: null,
                isDelivered: false,
                deliveredAt: null,
                isRead: false,
                readAt: null,
                readBy: []
            }
        };

        setMessages(prev => [...prev, messageData]);

        // Clear input
        setMessage('');
        setReplyToMessage(null);

        if (socketRef.current?.connected) {
            socketRef.current.emit('send_message', messageData);

            // Update to "sent" status
            setTimeout(() => {
                setMessages(prev => prev.map(msg =>
                    msg.msgId === tempId
                        ? {
                            ...msg,
                            status: "sent",
                            msgStatus: "sent",
                            metaData: {
                                ...msg.metaData,
                                isSent: true,
                                sentAt: Date.now()
                            }
                        }
                        : msg
                ));
            }, 100);

        } else {
            // Show error
            setMessages(prev => prev.map(msg =>
                msg.msgId === tempId
                    ? {
                        ...msg,
                        status: "failed",
                        msgStatus: "failed",
                        error: "Not connected to server"
                    }
                    : msg
            ));
        }
    };




    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    const formatTime = (timestamp) => {
        if (!timestamp) {
            return '';
        }

        const date = new Date(timestamp);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return '';
        }

        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return date.toLocaleDateString([], { weekday: 'short' });
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const formatDateHeader = (dateKey) => {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (dateKey === today) return "Today";
        if (dateKey === yesterday) return "Yesterday";

        // Format older dates nicely
        const date = new Date(dateKey);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };
    const groupMessagesByDate = (messages) => {
        const grouped = {};
        messages.forEach(msg => {
            const date = new Date(msg.timestamp);
            const dateKey = date.toDateString();
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(msg);
        });
        return grouped;
    };

    return (
        <div className="flex flex-1 h-full bg-[#085056] text-white">
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                    const accept = e.target.getAttribute('accept');
                    if (accept?.includes('image')) {
                        handleImageSelect(e);
                    } else {
                        handleDocumentSelect(e);
                    }
                }}
                className="hidden"
            />
            {!socketInitialized || !currentUser.id || isLoadingGroups ? (
                <Loader />
            ) : (
                <ChatWindow
                    selectedGroup={selectedGroup}
                    messages={messages}
                    members={Allusers}
                    handleReplyMessage={handleReplyMessage}
                    showMembers={showMembers}
                    ReadInfoButton={ReadInfoButton}
                    setShowMembers={setShowMembers}
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={sendMessage}
                    onBackToGroups={handleBackToGroups}
                    deleteForEveryone={deleteForEveryone}
                    currentUser={currentUser}
                    typingUsers={typingUsers}
                    onlineUsers={onlineUsers}
                    showEmojiPicker={showEmojiPicker}
                    setShowEmojiPicker={setShowEmojiPicker}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    filePreview={filePreview}
                    deleteForMe={deleteForMe}
                    setFilePreview={setFilePreview}
                    showFilePreview={showFilePreview}
                    setShowFilePreview={setShowFilePreview}
                    isRecording={isRecording}
                    reportMessage={reportMessage}
                    setIsRecording={setIsRecording}
                    audioBlob={audioBlob}
                    setAudioBlob={setAudioBlob}
                    replyToMessage={replyToMessage}
                    recordingTime={recordingTime}
                    groupKey={DecryptedKey[0]}
                    setRecordingTime={setRecordingTime}
                    playingAudio={playingAudio}
                    setPlayingAudio={setPlayingAudio}
                    showFilesPanel={showFilesPanel}
                    setShowFilesPanel={setShowFilesPanel}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    handleFileSelect={handleFileSelect}
                    cancelFileUpload={cancelFileUpload}
                    handleReply={handleReply}
                    cancelReply={cancelReply}
                    sendFileMessage={sendFileMessage}
                    handleTyping={handleTyping}
                    formatTime={formatTime}
                    formatDuration={formatDuration}
                    fileInputRef={fileInputRef}
                    emojiPickerRef={emojiPickerRef}
                    messagesEndRef={messagesEndRef}
                    chatFiles={chatFiles}
                    isDeletingMessage={isDeletingMessage}
                    setIsDeletingMessage={setIsDeletingMessage}
                    loadingFiles={loadingFiles}
                    uploadingFile={uploadingFile}
                    uploadingAudio={uploadingAudio}
                    socketRef={socketRef}
                    formatDateHeader={formatDateHeader}
                    groupMessagesByDate={groupMessagesByDate}
                    onClearChat={handleClearChat}
                    loadOlderMessages={loadOlderMessages}
                    retryMessage={retryMessage}
                    showClearChatModal={showClearChatModal}
                    setShowClearChatModal={setShowClearChatModal}
                    loadNewerMessages={loadNewerMessages}
                    showFileTypeModal={showFileTypeModal}
                    setShowFileTypeModal={setShowFileTypeModal}
                    isLoadingOlder={isLoadingOlder}
                    isLoadingNewer={isLoadingNewer}
                    hasMoreOldMessages={hasMoreOldMessages}
                    isLoadingMoreUsers={isLoadingMoreUsers}
                    hasMoreUsers={hasMoreUsers}
                    hasMoreNewMessages={hasMoreNewMessages}
                    isLoadingMessages={isLoadingMessages}
                    isInitialMessagesLoad={isInitialMessagesLoad}
                    isLoadingGroups={isLoadingGroups}

                    totalUsers={totalUsers}

                    isLoadingUsers={isLoadingUsers}
                    userPage={userPage}
                    totalPages={totalPages}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                    imageCaption={imageCaption}

                    setImageCaption={setImageCaption}
                    documentCaption={documentCaption}
                    setDocumentCaption={setDocumentCaption}
                    showImagePreview={showImagePreview}
                    setShowImagePreview={setShowImagePreview}
                    showDocumentPreview={showDocumentPreview}
                    setShowDocumentPreview={setShowDocumentPreview}
                    isInputDisabled={isInputDisabled}
                    setIsInputDisabled={setIsInputDisabled}
                    uploadProgress={uploadProgress}
                    handleImageSelect={handleImageSelect}
                    handleDocumentSelect={handleDocumentSelect}
                    sendImageMessage={sendImageMessage}
                    sendDocumentMessage={sendDocumentMessage}
                    cancelImageUpload={cancelImageUpload}
                    cancelDocumentUpload={cancelDocumentUpload}
                    removeImage={removeImage}
                    formatFileSize={formatFileSize}
                    refetchFiles={refetchFiles}

                // getFileIcon={getFileIcon}
                />

            )}
            <ToastContainer position="top-right" />

        </div>

    );
};

export default GroupChatApp;


