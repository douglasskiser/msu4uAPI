'use strict';

angular.module('appApp')
    .factory('Modal', function($rootScope, $modal, Auth, User, Audio, Events, Notifications) {
        /**
         * Opens a modal
         * @param  {Object} scope      - an object to be merged with modal's scope
         * @param  {String} modalClass - (optional) class(es) to be applied to the modal
         * @return {Object}            - the instance $modal.open() returns
         */
        function openModal(scope, modalClass) {
            var modalScope = $rootScope.$new();
            scope = scope || {};
            modalClass = modalClass || 'modal-default';

            angular.extend(modalScope, scope);

            return $modal.open({
                templateUrl: 'components/modal/modal.html',
                windowClass: modalClass,
                scope: modalScope
            });
        }

        // Public API here
        return {

            /* Confirmation modals */
            confirm: {

                /**
                 * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
                 * @param  {Function} del - callback, ran when delete is confirmed
                 * @return {Function}     - the function to open the modal (ex. myModalFn)
                 */
                delete: function(del) {
                    del = del || angular.noop;

                    /**
                     * Open a delete confirmation modal
                     * @param  {String} name   - name or info to show on modal
                     * @param  {All}           - any additional args are passed staight to del callback
                     */
                    return function() {
                        var args = Array.prototype.slice.call(arguments),
                            name = args.shift(),
                            deleteModal;

                        deleteModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Confirm Delete',
                                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                                buttons: [{
                                    classes: 'btn-danger',
                                    text: 'Delete',
                                    click: function(e) {
                                        deleteModal.close(e);
                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Cancel',
                                    click: function(e) {
                                        deleteModal.dismiss(e);
                                    }
                                }]
                            }
                        }, 'modal-danger');

                        deleteModal.result.then(function(event) {
                            del.apply(event, args);
                        });
                    };
                }
            },
            audio: {
                add: function() {

                    return (function() {
                        var addAudioModal;

                        addAudioModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Add Audio',
                                upload: true,
                                buttons: [{
                                    classes: 'btn-default',
                                    text: 'Close',
                                    click: function(e) {
                                        addAudioModal.dismiss(e);
                                    }
                                }]
                            }
                        });
                    })();
                },
                delete: function(clip, cb) {
                    return (function() {
                        var deleteAudioModal;

                        deleteAudioModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Delete Audio',
                                html: '<p>Are you sure you want to delete <strong>' + clip.fileName + '</strong> ?</p>',
                                buttons: [{
                                    classes: 'btn-danger',
                                    text: 'Delete',
                                    click: function(e) {
                                        // FIX********
                                        Audio.remove({
                                            id: clip._id
                                        });

                                        deleteAudioModal.close(e, true);
                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Close',
                                    click: function(e) {
                                        deleteAudioModal.dismiss(e, false);
                                    }
                                }]
                            }
                        });

                        deleteAudioModal.result.then(function(event, wasRemoved) {
                            return cb(wasRemoved);
                        });
                    })();
                }
            },
            events: {
                add: function(cb) {
                    cb = cb || angular.noop;

                    return (function() {
                        var addEventModal;

                        addEventModal = openModal({
                                modal: {
                                    dismissable: true,
                                    title: 'Add Event',
                                    form: 'event',
                                    formModel: {
                                        name: '',
                                        description: '',
                                        date: '',
                                        time: '',
                                        location: ''
                                    },
                                    datePickerIsOpen: false,
                                    openDatePicker: function($event) {
                                        $event.preventDefault();
                                        $event.stopPropagation();
                                        this.datePickerIsOpen = true;
                                    },
                                    buttons: [{
                                        classes: 'btn-default',
                                        text: 'Cancel',
                                        click: function(e) {
                                            addEventModal.dismiss(e);
                                        }
                                    }, {
                                        classes: 'btn-primary',
                                        text: 'Save',
                                        passData: true,
                                        click: function(evt) {

                                            Events.save({
                                                name: evt.name,
                                                description: evt.description,
                                                date: evt.date,
                                                time: evt.time,
                                                location: evt.location
                                            }, function(data) {
                                                Notifications.add({
                                                    type: 'success',
                                                    message: 'Event has been added.'
                                                });
                                                addEventModal.close(data);
                                            }, function() {
                                                Notifications.add({
                                                    type: 'danger',
                                                    message: 'There was error adding the event.'
                                                });
                                            });

                                        }
                                    }]
                                }
                            },
                            'modal-default');

                        addEventModal.result.then(function(evt) {
                            if (evt.name) {
                                return cb(evt);
                            }
                            return cb();
                        });
                    })();
                },
                update: function(evtObj, cb) {
                    cb = cb || angular.noop;

                    return (function() {
                        var updateEventModal;

                        updateEventModal = openModal({
                                modal: {
                                    dismissable: true,
                                    title: 'Add Event',
                                    form: 'event',
                                    formModel: {
                                        name: evtObj.name,
                                        description: evtObj.description,
                                        date: evtObj.date,
                                        time: evtObj.time,
                                        location: evtObj.location,
                                        _id: evtObj._id
                                    },
                                    datePickerIsOpen: false,
                                    openDatePicker: function($event) {
                                        $event.preventDefault();
                                        $event.stopPropagation();
                                        this.datePickerIsOpen = true;
                                    },
                                    buttons: [{
                                        classes: 'btn-default',
                                        text: 'Cancel',
                                        click: function(e) {
                                            updateEventModal.dismiss(e);
                                        }
                                    }, {
                                        classes: 'btn-primary',
                                        text: 'Update',
                                        passData: true,
                                        click: function(evt) {

                                            Events.update({id: evtObj._id}, {
                                                name: evt.name,
                                                description: evt.description,
                                                date: evt.date,
                                                time: evt.time,
                                                location: evt.location
                                            }, function(data) {
                                                Notifications.add({
                                                    type: 'success',
                                                    message: 'Event has been updated.'
                                                });
                                                updateEventModal.close(data);
                                            }, function() {
                                                Notifications.add({
                                                    type: 'danger',
                                                    message: 'There was error updating the event.'
                                                });
                                            });

                                        }
                                    }]
                                }
                            },
                            'modal-default');

                        updateEventModal.result.then(function(evt) {
                            if (evt.name) {
                                return cb(evt);
                            }
                            return cb();
                        });
                    })();
                },
                delete: function(evt, cb) {
                    return (function() {
                        var deleteEventModal;

                        deleteEventModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Delete Event',
                                html: '<p>Are you sure you want to delete <strong>' + evt.name + '</strong> ?</p>',
                                buttons: [{
                                    classes: 'btn-danger',
                                    text: 'Delete',
                                    click: function(e) {
                                        Events.remove({
                                            id: evt._id
                                        }, function() {
                                            deleteEventModal.close(e, true);
                                        });


                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Close',
                                    click: function(e) {
                                        deleteEventModal.dismiss(e, false);
                                    }
                                }]
                            }
                        });

                        deleteEventModal.result.then(function(event, wasRemoved) {
                            return cb(wasRemoved);
                        });
                    })();
                }
            },
            users: {
                add: function(cb) {
                    cb = cb || angular.noop;

                    return (function() {
                        var addUserModal;

                        addUserModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Add User',
                                form: 'addUser',
                                formModel: {
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirm: ''
                                },
                                buttons: [{
                                    classes: 'btn-primary',
                                    text: 'Save',
                                    passData: true,
                                    click: function(user) {
                                        if (user.password.length < 5) {
                                            user.errors = 'Password is too short.';
                                        } else if (user.password !== user.confirm) {
                                            user.errors = 'Confirmation does not match password.';
                                        } else {
                                            Auth.createUser({
                                                    name: user.username,
                                                    email: user.email,
                                                    password: user.password
                                                })
                                                .then(function(usr) {
                                                    Notifications.add({
                                                        type: 'success',
                                                        message: 'User has been added.'
                                                    });
                                                    addUserModal.close(usr);
                                                })
                                                .catch(function() {
                                                    Notifications.add({
                                                        type: 'danger',
                                                        message: 'There was error adding user.'
                                                    });
                                                });

                                        }

                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Cancel',
                                    click: function(e) {
                                        addUserModal.dismiss(e);
                                    }
                                }]
                            }
                        }, 'modal-default');

                        addUserModal.result.then(function(user) {
                            if (user.email) {
                                return cb(user);
                            }
                            return cb();
                        });
                    })();
                },
                delete: function(user, cb) {
                    cb = cb || angular.noop;

                    return (function() {
                        var deleteUserModal;

                        deleteUserModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Confirm delete',
                                html: '<p>Are you sure you want to delete <strong>' + user.name + '</strong> ?</p>',
                                buttons: [{
                                    classes: 'btn-danger',
                                    text: 'Delete',
                                    click: function() {
                                        User.remove({
                                            id: user._id
                                        });

                                        Notifications.add({
                                            type: 'success',
                                            message: 'User has been deleted.'
                                        });

                                        deleteUserModal.close();
                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Cancel',
                                    click: function() {
                                        deleteUserModal.dismiss();
                                    }
                                }]
                            }
                        }, 'modal-danger');

                        deleteUserModal.result.then(function() {
                            cb.apply();
                        });
                    })();
                }
            }
        };
    });
