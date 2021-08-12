### student features

1. Search student by name
2. Search student by class
3. Search student by month of birth

4. Create student with these input field: name, class registered, contact, date of birth, joined date
5. Display student list with these infomation: name, birthday, classes, More action module

### More action module

1. Print student invoice fee
2. Add class
3. Delete and edit student infomation
4. Print student performance review

### Use Case 1 Calculate student fee
###### Level: User-goal
###### Actors 
- User
- Student page
###### Preconditions: 
- The Student is created
- The Student has at least 1 class

###### Postconditions: 
- A pdf file is created containing: classes attended, fee for each class, total fees

###### Main Success Scenario:
1. The User click on the print fee button
2. The app get total class_date from each class that student attended (excluding class_dates that user has deleted manually)
3. The app calculate total fee of each class based on fee of 1 class_date and total class_date
4. Repeated for all other classes that Student attended.
5. Calculate total fee and print result into a pdf file.

###### Alternate scenario:
1. Student has no class
- Popup dialog: “Student has no class”
