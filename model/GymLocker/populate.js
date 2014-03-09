var mongoose = require('mongoose');
var BioTypeModel = mongoose.model('BiometricType');
var EquipTypeModel = mongoose.model('EquipmentType');
var ExModel = mongoose.model('Exercises');
var ExTypeModel = mongoose.model('ExerciseType');
var MuscleModel = mongoose.model('MuscleGroup');
var UserModel = mongoose.model('User');

exports.tryPopulate = tryPopulate;

function tryPopulate() {
	console.log('Trying to Populate...');

	BioTypeModel.find({}, function(err, result) {
		if(result.length == 0)
			populateBioType();
	});

	EquipTypeModel.find({}, function(err, result) {
		if(result.length == 0)
			populateEquipType();
	});

	ExModel.find({}, function(err, result) {
		if(result.length == 0) 
			populateExercises();
	});

	ExTypeModel.find({}, function(err, result) {
		if(result.length == 0) 
			populateExType();
	});

	MuscleModel.find({}, function(err, result) {
		if(result.length == 0)
			populateMuscle();
	});

	// UserModel.find({}, function(err, result) {
	// 	if(result.length == 0)
	// 		populateUser();
	// });

	console.log('Populating Complete...');
}

// Pre-populate the "Biometric Type" collection
function populateBioType() {
	console.log('Starting: Populating Biometric Types...');
	var biotypes = [
		new BioTypeModel({
			name : 'Weight',
			typecode : 'W'
		}),
		new BioTypeModel({
			name : 'Lean Body Mass',
			typecode : 'LBM'
		}),
		new BioTypeModel({
			name : 'Height',
			typecode : 'H'
		}),
		new BioTypeModel({
			name : 'Body Fat Percentage',
			typecode : 'BFP'
		}),
		new BioTypeModel({
			name : 'Systolic Blood Pressure',
			typecode : 'SBP'
		}),
		new BioTypeModel({
			name : 'Diastolic Blood Pressure',
			typecode : 'DBP'
		}),
		new BioTypeModel({
			name : 'Body Mass Index',
			typecode : 'BMI'
		}),
		new BioTypeModel({
			name : 'Neck Circumference',
			typecode : 'NC'
		}),
		new BioTypeModel({
			name : 'Chest Circumference',
			typecode : 'CC'
		}),
		new BioTypeModel({
			name : 'Waist Circumference',
			typecode : 'WC'
		}),
		new BioTypeModel({
			name : 'Hip Circumference',
			typecode : 'HC'
		}),
		new BioTypeModel({
			name : 'Left Thigh Circumference',
			typecode : 'LTC'
		}),
		new BioTypeModel({
			name : 'Right Thigh Circumference',
			typecode : 'RTC'
		}),
		new BioTypeModel({
			name : 'Left Calf Circumference',
			typecode : 'LCC'
		}),
		new BioTypeModel({
			name : 'Right Calf Circumference',
			typecode : 'RCC'
		}),
		new BioTypeModel({
			name : 'Left Bicep Circumference',
			typecode : 'LBC'
		}),
		new BioTypeModel({
			name : 'Right Bicep Circumference',
			typecode : 'RBC'
		}),
		new BioTypeModel({
			name : 'Left Forearm Circumference',
			typecode : 'LFC'
		}),
		new BioTypeModel({
			name : 'Right Forearm Circumference',
			typecode : 'RFC'
		})
	];

	for(var i = 0; i < biotypes.length; i++) {
		biotypes[i].save(function(err, result) {});
	}
	console.log('Done: Populating Biometric Types.');
}

// Pre-populate the "Equipment Type" collection
function populateEquipType() {
	console.log('Starting: Populating Equipment Types...');
	var equip = [
		new EquipTypeModel({ name : 'N/A' }),
		new EquipTypeModel({ name : 'Exercise Ball' }),
		new EquipTypeModel({ name : 'Medicine Ball' }),
		new EquipTypeModel({ name : 'Dumbbell' }),
		new EquipTypeModel({ name : 'Barbell' }),
		new EquipTypeModel({ name : 'Kettlebell' }),
		new EquipTypeModel({ name : 'Elliptical' }),
		new EquipTypeModel({ name : 'Treadmill' }),
		new EquipTypeModel({ name : 'Recumbent Bike' }),
		new EquipTypeModel({ name : 'Upright Bike' }),
		new EquipTypeModel({ name : 'Leg Press Machine' }),
		new EquipTypeModel({ name : 'Leg Extension Machine' }),
		new EquipTypeModel({ name : 'Leg Curl Machine' }),
		new EquipTypeModel({ name : 'Hip Adduction/Abduction Machine' }),
		new EquipTypeModel({ name : 'Standing Calf Machine' }),
		new EquipTypeModel({ name : 'Seated Calf Machine' }),
		new EquipTypeModel({ name : 'Sit-Up Machine' }),
		new EquipTypeModel({ name : 'Torso Twist Machine' }),
		new EquipTypeModel({ name : 'Bicep Curl Machine' }),
		new EquipTypeModel({ name : 'Tricep Press Machine' }),
		new EquipTypeModel({ name : 'Tricep Extension Machine' }),
		new EquipTypeModel({ name : 'Chest Press Machine' }),
		new EquipTypeModel({ name : 'Chest Fly Machine' }),
		new EquipTypeModel({ name : 'Shoulder Press Machine' }),
		new EquipTypeModel({ name : 'Lat Pulldown Machine' }),
		new EquipTypeModel({ name : 'Back Row Machine' }),
		new EquipTypeModel({ name : 'Back Extension Machine' }),
		new EquipTypeModel({ name : 'E-Z Curl Bar' }),
		new EquipTypeModel({ name : 'Cables' })
	];

	for(var i = 0; i < equip.length; i++) {
		equip[i].save(function(err, result) {});
	}
	console.log('Done: Populating Equipment Types.');
}

function populateExercises() {
	console.log('Starting: Populating Exercises...');
	var exercises = [
		new ExModel({
			name 		: 'Bench Pres',
			description	: "<ol><li>Begin by lying on the bench, getting your head beyond the bar if possible. Tuck your feet underneath you and arch your back. Using the bar to help support your weight, lift your shoulder off the bench and retract them, squeezing the shoulder blades together. Use your feet to drive your traps into the bench. Maintain this tight body position throughout the movement.</li><li>However wide your grip, it should cover the ring on the bar. Pull the bar out of the rack without protracting your shoulders. Focus on squeezing the bar and trying to pull it apart.</li><li>Lower the bar to your lower chest or upper stomach. The bar, wrist, and elbow should stay in line at all times.</li><li>Pause when the barbell touches your torso, and then drive the bar up with as much force as possible. The elbows should be tucked in until lockout.</li>",
			muscle 		: 'Chest',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=wOnP_oAXUMA'
		}),
		new ExModel({
			name 		: 'Incline Bench Press',
			description	: '<ol><li>Lie back on an incline bench. Using a medium-width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.</li><li>As you breathe in, come down slowly until you feel the bar on you upper chest.</li><li>After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your chest muscles. Lock your arms in the contracted position, squeeze your chest, hold for a second and then start coming down slowly again. Tip: it should take at least twice as long to go down than to come up.</li><li>Repeat the movement for the prescribed amount of repetitions.</li><li>When you are done, place the bar back in the rack.</li></ol><b>Caution:</b> If you are new at this exercise, it is advised that you use a spotter. If no spotter is available, then be conservative with the amount of weight used. Also, beware of letting the bar drift too far forward. You want the bar to fall on your upper chest and nowhere else.<br><br>Variations: You can use several angles on the incline bench if the one you are using is adjustable.',
			muscle 		: 'Chest',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=dynoKEIcpoU'
		}),
		new ExModel({
			name 		: 'Chin Up',
			description	: '<ol><li>Grab the pull-up bar with the palms facing your torso and a grip closer than the shoulder width.</li><li>As you have both arms extended in front of you holding the bar at the chosen grip width, keep your torso as straight as possible while creating a curvature on your lower back and sticking your chest out. This is your starting position. Tip: Keeping the torso as straight as possible maximizes biceps stimulation while minimizing back involvement.</li><li>As you breathe out, pull your torso up until your head is around the level of the pull-up bar. Concentrate on using the biceps muscles in order to perform the movement. Keep the elbows close to your body. Tip: The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar.</li><li>After a second of squeezing the biceps in the contracted position, slowly lower your torso back to the starting position; when your arms are fully extended. Breathe in as you perform this portion of the movement.</li><li>Repeat this motion for the prescribed amount of repetitions.</li></ol>Variations:<br><ol><li>If you are new at this exercise and do not have the strength to perform it, use a pull-up assist machine if available. These machines use weight to help you push your bodyweight.</li><li>Otherwise, a spotter holding your legs can help.</li><li>On the other hand, more advanced lifters can add weight to the exercise by using a weight belt that allows the addition of weighted plates</li></ol>',
			muscle 		: 'Back',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Incline Dumbbell Press',
			description	: '<ol><li>Lie back on an incline bench with a dumbbell in each hand atop your thighs. The palms of your hands will be facing each other.</li><li>Then, using your thighs to help push the dumbbells up, lift the dumbbells one at a time so that you can hold them at shoulder width.</li><li>Once you have the dumbbells raised to shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. This will be your starting position.</li><li>Be sure to keep full control of the dumbbells at all times. Then breathe out and push the dumbbells up with your chest.</li><li>Lock your arms at the top, hold for a second, and then start slowly lowering the weight. Tip Ideally, lowering the weights should take about twice as long as raising them.</li><li>Repeat the movement for the prescribed amount of repetitions.</li><li>When you are done, place the dumbbells back on your thighs and then on the floor. This is the safest manner to release the dumbbells.</li></ol>Variations: You can use several angles on the incline bench if the bench you are using is adjustable.<br>Another variation of this exercise is to perform it with the palms of the hands facing each other.<br>Also, you can perform the exercise with the palms facing each other and then twisting the wrist as you lift the dumbbells so that at the top of the movement the palms are facing away from the body. I personally do not use this variation very often as it seems to be hard on my shoulders.',
			muscle 		: 'Chest',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Deadlift',
			description	: "<ol><li>Stand shoulder width apart with the bar above the centre of your feet<br></li><li>Grab the bar overhand so your arms are vertical to the floor<br></li><li>Bend through your knees until your shins hit the bar which must remain above the middle of your feet<br></li><li>Lift your chest, but don't squeeze your shoulder-blades<br></li><li>Pull, keeping the bar close to your body<br></li></ol>",
			muscle 		: 'Back',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=cs-wOHN5tdw'
		}),
		new ExModel({
			name 		: 'Bicycle Crunches',
			description	: '<ol><li>Lie face up on your mat and place your hands behind your head, lightly supporting it with your fingers.<br></li><li>Bring the knees in to the chest and lift the shoulder blades off the floor without pulling on the neck.<br></li><li>Rotate to the left, bringing the right elbow towards the left knee as you straighten the other leg.<br></li><li>Switch sides, bringing the left elbow towards the right knee.<br></li><li>Continue alternating sides in a "pedaling" motion for 1-3 sets of 12-16 reps.<br></li></ol>',
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=ixQGJ3Ja-2I'
		}),
		new ExModel({
			name 		: "Captain's Chair Leg Raise",
			description	: "<ol><li>Stand on the chair and grip handholds to stabilize your upper body.<br></li><li>Press your back against the pad and contract the abs to raise the legs and lift knees towards your chest.<br></li><li>Don't arch the back or swing the legs up.<br></li><li>Slowly lower back down and repeat for 1-3 sets of 12-16 reps.<br></li></ol>",
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=T_WgtUHPfhw'
		}),
		new ExModel({
			name 		: 'Ball Crunch',
			description	: "<ol><li>Lie on the ball, positioning it under the lower back.<br></li><li>Cross your arms over the chest or place them behind your head.<br></li><li>Contract your abs to lift your torso off the ball, pulling the bottom of your ribcage down toward your hips.<br></li><li>As you curl up, keep the ball stable (i.e., the ball shouldn't roll).<br></li><li>Lower back down, getting a stretch in the abs, and repeat for 1-3 sets of 12-16 reps.<br></li></ol>",
			muscle 		: 'Abs',
			equip		: 'Exercise Ball',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Vertical Leg Crunch',
			description	: "<ol><li>Lie on the floor and extend the legs straight up with knees crossed.</li><li>Place your hands behind the head for support, but avoid pulling on the neck.</li><li>Contract the abs to lift the shoulder blades off the floor, as though reaching your chest towards your feet.</li><li>Keep the legs in a fixed position and imagine bringing your belly button towards your spine at the top of the movement.</li><li>Lower and repeat for 1-3 sets of 12-16 reps.</li></ol>",
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=gt62sf7khLU'
		}),
		new ExModel({
			name 		: 'Long Arm Crunch',
			description	: "<ol><li>Lie on a mat and extend the arms straight out behind the head with hands clasped, keeping the arms next to the ears.</li><li>Contract the abs and lift the shoulder blades off the floor.</li><li>Keep the arms straight and avoid straining the neck. If you feel neck pain, take one hand behind the head while keeping the other arm extended.</li><li>Lower and repeat for 1-3 sets of 12-16 reps.</li><li>You can add intensity by holding a light dumbbell if you need more of a challenge.</li></ol>",
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=3fDjzzfovZE'
		}),
		new ExModel({
			name 		: 'Reserve Crunch',
			description	: "<ol><li>Lie on the floor and place hands on the floor or behind the head.</li><li>Bring the knees in towards the chest until they're bent to 90 degrees, with feet together or crossed.</li><li>Contract the abs to curl the hips off the floor, reaching the legs up towards the ceiling.</li><li>Lower and repeat for 1-3 sets of 12-16 reps.</li><li>It's a very small movement, so try to use your abs to lift your hips rather than swinging your legs and creating momentum.</li></ol>",
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=hyv14e2QDq0'
		}),
		new ExModel({
			name 		: 'Crunch with Heel Push',
			description	: "<ol><li>Lie on your back with the knees bent and the hands gently cradling the head.</li><li>Flex your feet and keep them flexed as your contract the abs, lifting the shoulder blades off the floor.</li><li>Try not to pull on the neck with your hands, but lightly support your head.</li><li>At the top of the crunch, press your heels into the floor while pressing your back against the mat and slightly raising the glutes off the floor.</li><li>Lower and repeat for 1-3 sets of 12-16 reps.</li></ol>",
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Plank on Elbows and Toes',
			description	: "<ol><li>Lie face down on mat resting on the forearms, palms flat on the floor.</li><li>Push off the floor, raising up onto toes and resting on the elbows.</li><li>Keep your back flat, in a straight line from head to heels.</li><li>Tilt your pelvis and contract your abdominals to prevent your rear end from sticking up in the air or sagging in the middle.</li><li>Hold for 20 to 60 seconds, lower and repeat for 3-5 reps.</li></ol>",
			muscle 		: 'Abs',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=pSHjTRCQxIw'
		}),
		new ExModel({
			name 		: 'Alternating Renegade Row',
			description	: "<ol><li>Place two kettlebells on the floor about shoulder width apart. Position yourself on your toes and your hands as though you were doing a pushup, with the body straight and extended. Use the handles of the kettlebells to support your upper body. You may need to position your feet wide for support.</li><li>Push one kettlebell into the floor and row the other kettlebell, retracting the shoulder blade of the working side as you flex the elbow, pulling it to your side.</li><li>Then lower the kettlebell to the floor and begin the kettlebell in the opposite hand.</li><li>Repeat for several reps</li></ol>",
			muscle 		: 'Back',
			equip		: 'Kettlebell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=FH8VmSHCwVM'
		}),
		new ExModel({
			name 		: 'Bent Over Two-Arm Long Bar Row',
			description	: '<ol><li>Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a heavy object on the ground so the barbell cannot slide backward.</li><li>Bend forward until your torso is as close to parallel with the floor as you can and keep your knees slightly bent.<li>Now grab the bar with both arms just behind the plates on the side where the weight was placed and put your other hand on your knee. This will be your starting position.</li><li>Pull the bar straight up with your elbows in (to maximize back stimulation) until the plates touch your lower chest. Squeeze the back muscles as you lift the weight up and hold for a second at the top of the movement. Breathe out as you lift the weight. Tip: Use a stirrup or double handle cable attachment by hooking it under the end of the bar.</li><li>Slowly lower the bar to the starting position getting a nice stretch on the lats. Tip: Do not let the plates touch the floor. To ensure the best range of motion, I recommend using small plates (25-lb ones) as opposed to larger plates (like 35-45lb ones).</li><li>Repeat for the recommended amount of repetitions.</li></ol>',
			muscle 		: 'Back',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=peHT9DHwkNE'
		}),
		new ExModel({
			name 		: 'Bent Over Two-Dumbbell Row',
			description	: '<ol><li>With a dumbbell in each hand (palms facing each other), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor.</li><i>Tip: Make sure that you keep the head up. The weights should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position.</i></li><li>While keeping the torso stationary, lift the dumbbells to your side as you breathe out, squeezing your shoulder blades together. On the top contracted position, squeeze the back muscles and hold for a second.</li><li>Slowly lower the weight again to the starting position as you inhale.</li><li>Repeat for the recommended amount of repetitions</li></ol>',
			muscle 		: 'Back',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Seated Cable Rows',
			description	: '<ol><li>For this exercise you will need access to a low pulley row machine with a V-bar.</li><i>Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked.</i></li><li>Lean over as you keep the natural alignment of your back and grab the V-bar handles.</li><li>With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise.</li><li>Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in.</li><li>Repeat for the recommended amount of repetitions.</li></ol>',
			muscle 		: 'Back',
			equip		: 'Back Row Machine',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=7cuxLDo3qoc'
		}),
		new ExModel({
			name 		: 'Alternating Floor Press',
			description	: '<ol><li>Lie on the floor with two kettlebells next to your shoulders.</li><li>Position one in place on your chest and then the other, gripping the kettlebells on the handle with the palms facing forward.</li><li>Extend both arms, so that the kettlebells are being held above your chest. Lower one kettlebell, bringing it to your chest and turn the wrist in the direction of the locked out kettlebell.Raise the kettlebell and repeat on the opposite side.</li></ol>',
			muscle 		: 'Chest',
			equip		: 'Kettlebell',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'EZ-Bar Curl',
			description	: '<ol><li>Stand up straight while holding an EZ curl bar at the wide outer handle. The palms of your hands should be facing forward and slightly tilted inward due to the shape of the bar. Keep your elbows close to your torso. This will be your starting position.</li><li>Now, while keeping your upper arms stationary, exhale and curl the weights forward while contracting the biceps. Focus on only moving your forearms.</li><li>Continue to raise the weight until your biceps are fully contracted and the bar is at shoulder level. Hold the top contracted position for a moment and squeeze the biceps.</li><li>Then inhale and slowly lower the bar back to the starting position.</li><li>Repeat for the recommended amount of repetitions.</li></ol>',
			muscle 		: 'Biceps',
			equip		: 'E-Z Curl Bar',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=_0Gwaj_t6PQ'
		}),
		new ExModel({
			name 		: 'Bench Dip',
			description	: '<ol><li>For this exercise you will need to place a bench behind your back. With the bench perpendicular to your body, and while looking away from it, hold on to the bench on its edge with the hands fully extended, separated at shoulder width. </li><li>The legs will be extended forward, bent at the waist and perpendicular to your torso. This will be your starting position.</li><li>Slowly lower your body as you inhale by bending at the elbows until you lower yourself far enough to where there is an angle slightly smaller than 90 degrees between the upper arm and the forearm. Tip: Keep the elbows as close as possible throughout the movement. Forearms should always be pointing down.</li><li>Using your triceps to bring your torso up again, lift yourself back to the starting position.</li><li>Repeat for the recommended amount of repetitions.</li>',
			muscle 		: 'Triceps',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=jox1rb5krQI'
		}),
		new ExModel({
			name 		: 'Barbell Incline Shoulder Raise',
			description	: '<ol><li>Lie back on an Incline Bench. Using a medium width grip (a grip that is slightly wider than shoulder width), lift the bar from the rack and hold it straight over you with your arms straight. This will be your starting position.</li><li>While keeping the arms straight, lift the bar by protracting your shoulder blades, raising the shoulders from the bench as you breathe out.</li><li>Bring back the bar to the starting position as you breathe in.</li><li>Repeat for the recommended amount of repetitions.</li></ol><em>Variations:</em> You can use dumbbells or a smith machine in order to perform this exercise.',
			muscle 		: 'Chest',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Dumbbel One-Arm Triceps Extension',
			description	: '<ol><li>Grab a dumbbell and either sit on a military press bench or a utility bench that has a back support on it as you place the dumbbells upright on top of your thighs or stand up straight.</li><li>Clean the dumbbell up to bring it to shoulder height and then extend the arm over your head so that the whole arm is perpendicular to the floor and next to your head. The dumbbell should be on top of you. The other hand can be kept fully extended to the side, by the waist, supporting the upper arm that has the dumbbell or grabbing a fixed surface.</li><li>Rotate the wrist so that the palm of your hand is facing forward and the pinkie is facing the ceiling. This will be your starting position.</li><li>Slowly lower the dumbbell behind your head as you hold the upper arm stationary. Inhale as you perform this movement and pause when your triceps are fully stretched.</li><li>Return to the starting position by flexing your triceps as you breathe out. Tip: It is imperative that only the forearm moves. The upper arm should remain at all times stationary next to your head.Repeat for the recommended amount of repetitions and switch arms</li></ol>',
			muscle 		: 'Triceps',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=50U0VJGXPSE'
		}),
		new ExModel({
			name 		: 'Bent-Arm Dumbbell Pullover',
			description	: '<ol><li>Place a dumbbell standing up on a flat bench.</li><li>Ensuring that the dumbbell stays securely placed at the top of the bench, lie perpendicular to the bench (torso across it as in forming a cross) with only your shoulders lying on the surface.</li><li>Hips should be below the bench and legs bent with feet firmly on the floor. The head will be off the bench as well.</li><li>Grasp the dumbbell with both hands and hold it straight over your chest with a bend in your arms. Both palms should be pressing against the underside one of the sides of the dumbbell. </li><li>This will be your starting position. Caution: Always ensure that the dumbbell used for this exercise is secure. Using a dumbbell with loose plates can result in the dumbbell falling apart and falling on your face.</li><li>While keeping your arms locked in the bent arm position, lower the weight slowly in an arc behind your head while breathing in until you feel a stretch on the chest.</li><li>At that point, bring the dumbbell back to the starting position using the arc through which the weight was lowered and exhale as you perform this movement.</li><li>Hold the weight on the initial position for a second and repeat the motion for the prescribed number of repetitions.</li></ol><em><b>Caution:</b></em> If you are new to this movement, have a spotter hand you the weight instead. If not, please ensure that the dumbbell does not fall on you as you arrange your torso to perform the exercise on the bench.<br><br>Also, as I already mentioned, ensure that the dumbbell used is in perfect working condition. Old dumbbells in need of welding should never be used to perform this exercise.',
			muscle 		: 'Chest',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=vIVNqmPV8_E'
		}),
		new ExModel({
			name 		: 'Seated Triceps Press',
			description	: "<ol><li>Sit down on a bench with back support and grasp a dumbbell with both hands and hold it overhead at arm's length. Tip: a better way is to have somebody hand it to you especially if it is very heavy. The resistance should be resting in the palms of your hands with your thumbs around it. The palm of the hand should be facing inward. This will be your starting position.</li><li>Keeping your upper arms close to your head (elbows in) and perpendicular to the floor, lower the resistance in a semi-circular motion behind your head until your forearms touch your biceps. Tip: The upper arms should remain stationary and only the forearms should move. Breathe in as you perform this step.</li><li>Go back to the starting position by using the triceps to raise the dumbbell. Breathe out as you perform this step.</li><li>Repeat for the recommended amount of repetitions</li></ol>",
			muscle 		: 'Triceps',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=ETMBLqhd_to'
		}),
		new ExModel({
			name 		: 'Cable Crossover',
			description	: "<ol><li>To get yourself into the starting position, place the pulleys on a high position (above your head), select the resistance to be used and hold the pulleys in each hand.</li><li>Step forward in front of an imaginary straight line between both pulleys while pulling your arms together in front of you. Your torso should have a small forward bend from the waist. This will be your starting position.</li><li>With a slight bend on your elbows in order to prevent stress at the biceps tendon, extend your arms to the side (straight out at both sides) in a wide arc until you feel a stretch on your chest. Breathe in as you perform this portion of the movement. Tip: Keep in mind that throughout the movement, the arms and torso should remain stationary; the movement should only occur at the shoulder joint.</li><li>Return your arms back to the starting position as you breathe out. Make sure to use the same arc of motion used to lower the weights.</li><li>Hold for a second at the starting position and repeat the movement for the prescribed amount of repetitions.</li></ol><br><em>Variations:</em> You can vary the point in front of you where your arms meet.",
			muscle 		: 'Chest',
			equip		: 'Cables',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=taI4XduLpTk'
		}),
		new ExModel({
			name 		: 'Decline EZ Bar Triceps Extension',
			description	: '<ol><li>Secure your legs at the end of the decline bench and slowly lay down on the bench.</li><li>Using a close grip (a grip that is slightly less than shoulder width), lift the EZ bar from the rack and hold it straight over you with your arms locked and elbows in. The arms should be perpendicular to the floor. This will be your starting position. Tip: In order to protect your rotator cuff, it is best if you have a spotter help you lift the barbell off the rack.</li><li>As you breathe in and you keep the upper arms stationary, bring the bar down slowly by moving your forearms in a semicircular motion towards you until you feel the bar slightly touch your forehead. Breathe in as you perform this portion of the movement.</li><li>Lift the bar back to the starting position by contracting the triceps and exhaling.</li><li>Repeat until the recommended amount of repetitions is performed</li></ol>',
			muscle 		: 'Triceps',
			equip		: 'E-Z Curl Bar',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Barbell Full Squat',
			description	: '<ol><li>This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just above shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it.</li><li>Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso.</li><li>Step away from the rack and position your legs using a shoulder-width medium stance with the toes slightly pointed out. Keep your head up at all times and maintain a straight back. This will be your starting position.</li><li>Begin to slowly lower the bar by bending the knees and sitting back with your hips as you maintain a straight posture with the head up. Continue down until your hamstrings are on your calves. Inhale as you perform this portion of the movement.</li><li>Begin to raise the bar as you exhale by pushing the floor with the heel or middle of your foot as you straighten the legs and extend the hips to go back to the starting position.</li><li>Repeat for the recommended amount of repetitions.</li></ol><br>This type of squat allows a greater range of motion, and allows the trunk to maintain a more vertical position than other types of squats, due to foot position and the higher bar position.',
			muscle 		: 'Thighs',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=1xMaFs0L3ao'
		}),
		new ExModel({
			name 		: 'Lying Face Down Plate Neck Resistance',
			description	: '<ol><li>Lie face down with your whole body straight on a flat bench while holding a weight plate behind your head. Tip: You will need to position yourself so that your shoulders are slightly above the end of a flat bench in order for the upper chest, neck and face to be off the bench. This will be your starting position.</li><li>While keeping the plate secure on the back of your head slowly lower your head (as in saying "yes") as you breathe in.</li><li>Raise your head back up to the starting position in a semi-circular motion as you breathe out. Hold the contraction for a second.</li><li>Repeat for the recommended amount of repetitions.</li></ol>',
			muscle 		: 'Neck',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Clean Pull',
			description	: '<ol><li>With a barbell on the floor close to the shins, take an overhand or hook grip just outside the legs. Lower your hips with the weight focused on the heels, back straight, head facing forward, chest up, with your shoulders just in front of the bar. This will be your starting position.</li><li>Begin the first pull by driving through the heels, extending your knees. Your back angle should stay the same, and your arms should remain straight and elbows out. Move the weight with control as you continue to above the knees.</li><li>Next comes the second pull, the main source of acceleration for the clean. As the bar approaches the mid-thigh position, begin extending through the hips. In a jumping motion, accelerate by extending the hips, knees, and ankles, using speed to move the bar upward. There should be no need to actively pull through the arms to accelerate the weight; at the end of the second pull, the body should be fully extended, leaning slightly back, with the arms still extended. Full extension should be violent and abrupt, and ensure that you do not prolong the extension for longer than necessary.</li></ol>',
			muscle 		: 'Thighs',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=6SvyPlv-X08'
		}),
		new ExModel({
			name 		: 'Lying Face Up Plate Neck Resistance',
			description	: '<ol><li>Lie face up with your whole body straight on a flat bench while holding a weight plate on top of your forehead. Tip: You will need to position yourself so that your shoulders are slightly above the end of a flat bench in order for the traps, neck and head to be off the bench. This will be your starting position.</li><li>While keeping the plate secure on your forehead slowly lower your head back in a semi-circular motion as you breathe in.</li><li>Raise your head back up to the starting position in a semi-circular motion as you breathe out. Hold the contraction for a second.</li><li>Repeat for the recommended amount of repetitions</li></ol>',
			muscle 		: 'Neck',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=8jp0YTFoziU'
		}),
		new ExModel({
			name 		: 'Dumbbell Lunges',
			description	: '<ol><li>Stand with your torso upright holding two dumbbells in your hands by your sides. This will be your starting position.</li><li>Step forward with your right leg around 2 feet or so from the foot being left stationary behind and lower your upper body down, while keeping the torso upright and maintaining balance. Inhale as you go down. Note: As in the other exercises, do not allow your knee to go forward beyond your toes as you come down, as this will put undue stress on the knee joint. Make sure that you keep your front shin perpendicular to the ground.</li><li>Using mainly the heel of your foot, push up and go back to the starting position as you exhale.</li><li>Repeat the movement for the recommended amount of repetitions and then perform with the left leg.</li></ol><p><em><b>Caution:<b></em> This is a movement that requires a great deal of balance so if you suffer from balance problems you may wish to either avoid it or just use your own bodyweight while holding on to a fixed object. Definitely never perform with a barbell on your back if you suffer from balance issues.</p><p>One way is to alternate each leg. For instance do one repetition with the right, then the left, then the right and so on.</p><p>The other way is to do what I call a static lunge where your starting position is with one of your feet already forward. In this case, you just go up and down from that starting position until you are done with the recommended amount of repetitions. Then you switch legs and do the same.</p><p>A more challenging version is the walking lunges where you walk across the room but in a lunging fashion. For walking lunges the leg being left back has to be brought forward after the lunging action has happened in order to continue moving ahead. This version is reserved for the most advanced athletes.</p>',
			muscle 		: 'Thighs',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=D7KaRcUTQeE'
		}),
		new ExModel({
			name 		: 'Isometric Neck Exercises - Sides',
			description	: '<ol><li>With your head and neck in a neutral position (normal position with head erect facing forward), place your left hand on the left side of your head.</li><li>Now gently push towards the left as you contract the left neck muscles but resisting any movement of your head. Start with slow tension and increase slowly. Keep breathing normally as you execute this contraction.</li><li>Hold for the recommended number of seconds.</li><li>Now release the tension slowly.</li><li>Rest for the recommended amount of time and repeat with your right hand placed on the right side of your head.</li></ol>',
			muscle 		: 'Neck',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=5Ggh4axItnA'
		}),
		new ExModel({
			name 		: 'Overhead Cable Curl',
			description	: '<ol><li>To begin, set a weight that is comfortable on each side of the pulley machine. Note: Make sure that the amount of weight selected is the same on each side.</li><li>Now adjust the height of the pulleys on each side and make sure that they are positioned at a height higher than that of your shoulders.</li><li>Stand in the middle of both sides and use an underhand grip (palms facing towards the ceiling) to grab each handle. Your arms should be fully extended and parallel to the floor with your feet positioned shoulder width apart from each other. Your body should be evenly aligned the handles. This is the starting position.</li><li>While exhaling, slowly squeeze the biceps on each side until your forearms and biceps touch.</li><li>While inhaling, move your forearms back to the starting position. Note: Your entire body is stationary during this exercise except for the forearms.</li><li>Repeat for the recommended amount of repetitions prescribed in your program.</li></ol><br>Variations: This exercise can also be performed using one handle at a time',
			muscle 		: 'Biceps',
			equip		: 'Cables',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=tLh7rxaqw8Y'
		}),
		new ExModel({
			name 		: 'Arnold Dumbbell Press',
			description	: '<ol><li>Sit on an exercise bench with back support and hold two dumbbells in front of you at about upper chest level with your palms facing your body and your elbows bent. Tip: Your arms should be next to your torso. The starting position should look like the contracted portion of a dumbbell curl.</li><li>Now to perform the movement, raise the dumbbells as you rotate the palms of your hands until they are facing forward.</li><li>Continue lifting the dumbbells until your arms are extended above you in straight arm position. Breathe out as you perform this portion of the movement.</li><li>After a second pause at the top, begin to lower the dumbbells to the original position by rotating the palms of your hands towards you. Tip: The left arm will be rotated in a counter clockwise manner while the right one will be rotated clockwise. Breathe in as you perform this portion of the movement.</li><li>Repeat for the recommended amount of repetitions.</li><br>Variations: You can perform the exercise standing up but that is not recommended for people with lower back issues.',
			muscle 		: 'Shoulders',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=jLd6MS9B-jY'
		}),
		new ExModel({
			name 		: 'Ball Leg Curl',
			description	: '<ol><li>Begin on the floor laying on your back with your feet on top of the ball.</li><li>Position the ball so that when your legs are extended your ankles are on top of the ball. This will be your starting position.</li><li>Raise your hips off of the ground, keeping your weight on the shoulder blades and your feet.</li><li>Flex the knees, pulling the ball as close to you as you can, contracting the hamstrings.</li><li>After a brief pause, return to the starting position.</li></ol>',
			muscle 		: 'Hamstrings',
			equip		: 'Exercise Ball',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=fdv82EAUUTQ'
		}),
		new ExModel({
			name 		: 'Wide-Grip Standing Barbell Curl',
			description	: '<ol><li>Stand up with your torso upright while holding a barbell at the wide outer handle. The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position.</li><li>While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out.<br>Tip: Only the forearms should move.</li><li>Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard.</li><li>Slowly begin to bring the bar back to starting position as your breathe in.</li><li>Repeat for the recommended amount of repetitions.</li></ol><br><br>Variations:<br><ol><li>You can also perform this movement using an E-Z bar or E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement.</li><li>You may also use the closer grip for variety purposes</li>',
			muscle 		: 'Biceps',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=o2oCT5tZMA4'
		}),
		new ExModel({
			name 		: 'Kettlebell Dead Clean',
			description	: '<ol><li>Place kettlebell between your feet. To get in the starting position, push your butt back and look straight ahead.</li><li>Clean the kettlebell to your shoulder. Clean the kettlebell to your shoulders by extending through the legs and hips as you raise the kettlebell towards your shoulder. The wrist should rotate as you do so.</li><li>Lower the kettlebell, keeping the hamstrings loaded by keeping your back straight and your butt out.</li></ol>',
			muscle 		: 'Hamstrings',
			equip		: 'Kettlebell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=7Mi-dcdaKZs'
		}),
		new ExModel({
			name 		: 'Butt Lift (Bridge)',
			description	: '<ol><li>Lie flat on the floor on your back with the hands by your side and your knees bent. Your feet should be placed around shoulder width. This will be your starting position.</li><li>Pushing mainly with your heels, lift your hips off the floor while keeping your back straight. Breathe out as you perform this part of the motion and hold at the top for a second.</li><li>Slowly go back to the starting position as you breathe in.</li></ol>',
			muscle 		: 'Glutes',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=URhjZLFfKMs'
		}),
		new ExModel({
			name 		: 'Calf Press',
			description	: '<ol><li>Adjust the seat so that your legs are only slightly bent in the start position. The balls of your feet should be firmly on the platform.</li><li>Select an appropriate weight, and grasp the handles. This will be your starting position.</li><li>Straighten the legs by extending the knees, just barely lifting the weight from the stack. Your ankle should be fully flexed, toes pointing up. Execute the movement by pressing downward through the balls of your feet as far as possible.</li><li>After a brief pause, reverse the motion and repeat.</li></ol>',
			muscle 		: 'Calves',
			equip		: 'Leg Press Machine',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=3AV9iGWC0ug'
		}),
		new ExModel({
			name 		: 'Alternating Deltoid Raise',
			description	: '<ol><li>In a standing positin, hold a pair of dumbbells at your side.</li><li>Keeping your elbows slightly bent, raise the weights directly in front of you to shoulder height, avoiding any swinging or cheating.</li><li>Return the weights to your side.</li><li>On the next repetition, raise the weights laterally, raising them out to your side to about shoulder height.</li><li>Return the weights to the starting position and continue alternating to the front and side.</li></ol>',
			muscle 		: 'Shoulders',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=HMpx965fTh8'
		}),
		new ExModel({
			name 		: 'Hammer Curls',
			description	: '<ol><li>Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso.</li><li>The palms of the hands should be facing your torso. This will be your starting position.</li><li>Now, while holding your upper arm stationary, exhale and curl the weight forward while contracting the biceps. Continue to raise the weight until the biceps are fully contracted and the dumbbell is at shoulder level. Hold the contracted position for a brief moment as you squeeze the biceps. Tip: Focus on keeping the elbow stationary and only moving your forearm.</li><li>After the brief pause, inhale and slowly begin the lower the dumbbells back down to the starting position.</li><li>Repeat for the recommended amount of repetitions.</li></ol><br><br><b>Variations:</b> There are many possible variations for this movement. For instance, you can perform the exercise sitting down on a bench with or without back support and you can also perform it by alternating arms; first lift the right arm for one repetition, then the left, then the right, etc.',
			muscle 		: 'Biceps',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=vub3q-TACtg'
		}),
		new ExModel({
			name 		: 'Alternating Hang Clean',
			description	: '<ol><li>Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead.</li><li>Clean one kettlebell to your shoulder and hold on to the other kettlebell in a hanging position. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your shoulders. Rotate your wrist as you do so.</li><li>Lower the cleaned kettlebell to a hanging position and clean the alternate kettlebell. Repeat.</li></ol>',
			muscle 		: 'Shoulders',
			equip		: 'Kettlebell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=VsVLjcyIZ9E'
		}),
		new ExModel({
			name 		: 'Glute Kickback',
			description	: '<ol><li>Kneel on the floor or an exercise mat and bend at the waist with your arms extended in front of you (perpendicular to the torso) in order to get into a kneeling push-up position but with the arms spaced at shoulder width. Your head should be looking forward and the bend of the knees should create a 90-degree angle between the hamstrings and the calves. This will be your starting position.<li></li>As you exhale, lift up your right leg until the hamstrings are in line with the back while maintaining the 90-degree angle bend. Contract the glutes throughout this movement and hold the contraction at the top for a second. Tip: At the end of the movement the upper leg should be parallel to the floor while the calf should be perpendicular to it.</li><li>Go back to the initial position as you inhale and now repeat with the left leg.</li><li>Continue to alternate legs until all of the recommended repetitions have been performed</li></ol>',
			muscle 		: 'Glutes',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=45YVKSQN88E'
		}),
		new ExModel({
			name 		: 'Donkey Calf Raises',
			description	: '<ol><li>For this exercise you will need access to a donkey calf raise machine. Start by positioning your lower back and hips under the padded lever provided. The tailbone area should be the one making contact with the pad.</li><li>Place both of your arms on the side handles and place the balls of your feet on the calf block with the heels extending off. Align the toes forward, inward or outward, depending on the area you wish to target, and straighten the knees without locking them. This will be your starting position.</li><li>Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down.</li><li>Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched.</li><li>Repeat for the recommended amount of repetitions.</li></ol>',
			muscle 		: 'Calves',
			equip		: 'N/A',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=XEZUIXn5mgc'
		}),
		new ExModel({
			name 		: 'Clean and Jerk',
			description	: '<ol><li>With a barbell on the floor close to the shins, take an overhand or hook grip just outside the legs. Lower your hips with the weight focused on the heels, back straight, head facing forward, chest up, with your shoulders just in front of the bar. This will be your starting position.</li><li>Begin the first pull by driving through the heels, extending your knees. Your back angle should stay the same, and your arms should remain straight. Move the weight with control as you continue to above the knees.</li><li>Next comes the second pull, the main source of acceleration for the clean. As the bar approaches the mid-thigh position, begin extending through the hips. In a jumping motion, accelerate by extending the hips, knees, and ankles, using speed to move the bar upward. There should be no need to actively pull through the arms to accelerate the weight; at the end of the second pull, the body should be fully extended, leaning slightly back, with the arms still extended.</li><li>As full extension is achieved, transition into the third pull by aggressively shrugging and flexing the arms with the elbows up and out. At peak extension, aggressively pull yourself down, rotating your elbows under the bar as you do so. Receive the bar in a front squat position, the depth of which is dependent upon the height of the bar at the end of the third pull. The bar should be racked onto the protracted shoulders, lightly touching the throat with the hands relaxed. Continue to descend to the bottom squat position, which will help in the recovery.</li><li>Immediately recover by driving through the heels, keeping the torso upright and elbows up. Continue until you have risen to a standing position.</li><li>The second phase is the jerk, which raises the weight overhead. Standing with the weight racked on the front of the shoulders, begin with the dip. With your feet directly under your hips, flex the knees without moving the hips backward. Go down only slightly, and reverse direction as powerfully as possible.</li><li>Drive through the heels create as much speed and force as possible, and be sure to move your head out of the way as the bar leaves the shoulders.</li><li>At this moment as the feet leave the floor, the feet must be placed into the receiving position as quickly as possible. In the brief moment the feet are not actively driving against the platform, the athletes effort to push the bar up will drive them down. The feet should be split, with one foot forward, and one foot back. Receive the bar with the arms locked out overhead. Return to a standing position.</li></ol>',
			muscle 		: 'Shoulders',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=kGJ2LOMK-tU'
		}),
		new ExModel({
			name 		: 'Standing Palms-Up Barbell Behind The Back Wrist Curl',
			description	: "<ol><li>Start by standing straight and holding a barbell behind your glutes at arm's length while using a pronated grip (palms will be facing back away from the glutes) and having your hands shoulder width apart from each other.</li><li>You should be looking straight forward while your feet are shoulder width apart from each other. This is the starting position.</li><li>While exhaling, slowly elevate the barbell up by curling your wrist in a semi-circular motion towards the ceiling. <br>Note: Your wrist should be the only body part moving for this exercise.</li><li>Hold the contraction for a second and lower the barbell back down to the starting position while inhaling.</li><li>Repeat for the recommended amount of repetitions.</li><li>When finished, lower the barbell down to the squat rack or the floor by bending the knees. <br>Tip: It is easiest to either pick it up from a squat rack or have a partner hand it to you.</li></ol><br><br><b>Variations:</b> You can also perform this exercise with dumbbells using the same movements as described above. Another option is to use one dumbbell at a time for better isolation.",
			muscle 		: 'Forearms',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Kneeling Squat',
			description	: '<ol><li>Set the bar to the proper height in a power rack. Kneel behind the bar; it may be beneficial to put a mat down to pad your knees. Slide under the bar, racking it across the back of your shoulders. Your shoulder blades should be retracted and the bar tight across your back. Unrack the weight.</li><li>With your head looking forward, sit back with your butt until you touch your calves.</li><li>Reverse the motion, returning the torso to an upright position.</li></ol>',
			muscle 		: 'Glutes',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=PD6ABcQl3j4'
		}),
		new ExModel({
			name 		: 'Barbell Rear Delt Row',
			description	: '<ol><li>Stand up straight while holding a barbell using a wide (higher than shoulder width) and overhand (palms facing your body) grip.</li><li>Bend knees slightly and bend over as you keep the natural arch of your back. Let the arms hang in front of you as they hold the bar. Once your torso is parallel to the floor, flare the elbows out and away from your body. Tip: Your torso and your arms should resemble the letter "T". Now you are ready to begin the exercise.</li><li>While keeping the upper arms perpendicular to the torso, pull the barbell up towards your upper chest as you squeeze the rear delts and you breathe out. Tip: When performed correctly, this exercise should resemble a bench press in reverse. Also, refrain from using your biceps to do the work. Focus on targeting the rear delts; the arms should only act as hooks.</li><li>Slowly go back to the initial position as you breathe in.</li><li>Repeat for the recommended amount of repetitions.</li>Variations: You can perform this exercise using a smith machine or a T-bar row. You can also use the low pulley as long as you use a wide grip bar attachment.</ol>',
			muscle 		: 'Shoulders',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=98VnvfOPLIc'
		}),
		new ExModel({
			name 		: 'Front Dumbbell Raise',
			description	: '<ol><li>Pick a couple of dumbbells and stand with a straight torso and the dumbbells on front of your thighs at arms length with the palms of the hand facing your thighs. This will be your starting position.</li><li>While maintaining the torso stationary (no swinging), lift the left dumbbell to the front with a slight bend on the elbow and the palms of the hands always facing down. Continue to go up until you arm is slightly above parallel to the floor. Exhale as you execute this portion of the movement and pause for a second at the top. Inhale after the second pause.</li><li>Now lower the dumbbell back down slowly to the starting position as you simultaneously lift the right dumbbell.</li><li>Continue alternating in this fashion until all of the recommended amount of repetitions have been performed for each arm.</li>Variations: This exercise can also be performed both arms at the same time. Also, you could use a barbell as well.</ol>',
			muscle 		: 'Shoulders',
			equip		: 'Dumbbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=-t7fuZ0KhDA'
		}),
		new ExModel({
			name 		: "Farmer's Walk",
			description	: "<ol><li>There are various implements that can be used for the farmers walk. These can also be performed with heavy dumbbells or short bars if these implements aren't available. Begin by standing between the implements.</li><li>After gripping the handles, lift them up by driving through your heels, keeping your back straight and your head up.</li><li>Walk taking short, quick steps, and don't forget to breathe. Move for a given distance, typically 50-100 feet, as fast as possible.</li></ol>",
			muscle 		: 'Forearms',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=qaSwdBvtPV0'
		}),
		new ExModel({
			name 		: 'Palms-Down Wrist Curl',
			description	: '<ol><li>Start out by placing a barbell on one side of a flat bench.</li><li>Kneel down on both of your knees so that your body is facing the flat bench.</li><li>Use your arms to grab the barbell with a pronated grip (palms down) and bring them up so that your forearms are resting against the flat bench. Your wrists should be hanging over the edge.</li><li>Start out by curling your wrist upwards and exhaling.</li><li>Slowly lower your wrists back down to the starting position while inhaling.</li><li>Your forearms should be stationary as your wrist is the only movement needed to perform this exercise.</li><li>Repeat for the recommended amount of repetitions.</li></ol><br><br>Variations:<br><ol><li>This exercise can also be performed sitting down by using your thighs as a resting position for your forearms. Your wrist can hang over your knees and the same movements as mentioned above can be performed.</li><li>You can also use a dumbbell instead of a barbell.</li></ol>',
			muscle 		: 'Forearms',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: ''
		}),
		new ExModel({
			name 		: 'Seated Barbell Military Press',
			description	: '<ol><li>Sit on a Military Press Bench with a bar behind your head and either have a spotter give you the bar (better on the rotator cuff this way) or pick it up yourself carefully with a pronated grip (palms facing forward). Tip: Your grip should be wider than shoulder width and it should create a 90-degree angle between the forearm and the upper arm as the barbell goes down.</li><li>Once you pick up the barbell with the correct grip length, lift the bar up over your head by locking your arms. Hold at about shoulder level and slightly in front of your head. This is your starting position.</li><li>Lower the bar down to the collarbone slowly as you inhale.</li><li>Lift the bar back up to the starting position as you exhale.</li><li>Repeat for the recommended amount of repetitions.</li></ol><br><br>Variations:<ol><li>This exercise can also be performed standing but those with lower back problems are better off performing this seated variety.</li><li>The behind the neck variation is not recommended for people with shoulder problems as it can be hard on the rotator cuff due to the hyperextension created by bringing the bar behind the neck.</li></ol>',
			muscle 		: 'Shoulders',
			equip		: 'Barbell',
			exercise_type : 'Strength',
			video 		: 'http://www.youtube.com/watch?v=7NObCw5ouT8'
		})
	];

	for(var i = 0; i < exercises.length; i++) {
		exercises[i].save(function(err, result) {});
	}
	console.log('Done: Populating Exercises.');
}

// Pre-populate the "Exercise Type" collection
function populateExType() {
	console.log('Starting: Populating Exercise Types...');
	var exTypes = [
		new ExTypeModel({ name : 'Cardiovascular' }),
		new ExTypeModel({ name : 'Flexibility' }),
		new ExTypeModel({ name : 'Strength' })
	];

	for(var i = 0; i < exTypes.length; i++) {
		exTypes[i].save(function(err, result) {});
	}
	console.log('Done: Populating Exercise Types.');
}

// Pre-populate the "Muscle Groups" collection
function populateMuscle() {
	console.log('Starting: Populating Muscle Groups...');
	var muscles = [
		new MuscleModel({ name : 'Abs' }),
		new MuscleModel({ name : 'Back' }),
		new MuscleModel({ name : 'Biceps' }),
		new MuscleModel({ name : 'Calves' }),
		new MuscleModel({ name : 'Chest' }),
		new MuscleModel({ name : 'Forearms' }),
		new MuscleModel({ name : 'Glutes' }),
		new MuscleModel({ name : 'Hamstrings' }),
		new MuscleModel({ name : 'Neck' }),
		new MuscleModel({ name : 'Shoulders' }),
		new MuscleModel({ name : 'Thighs' }),
		new MuscleModel({ name : 'Triceps' })
	];

	for(var i = 0; i < muscles.length; i++) {
		muscles[i].save(function(err, result) {});
	}
	console.log('Done: Populating Muscle Groups.');
}

// Pre-populate "Users" collection with admins
// function populateUser() {
// 	console.log('Starting: Populating User...');
// 	var admins = [
// 		new UserModel({
// 			username : 'herald',
// 			password : 'pass',
// 			role : 1
// 		}),
// 		new UserModel({
// 			username : 'admin',
// 			password : 'pass',
// 			role : 1
// 		})
// 	];

// 	for(var i = 0; i < admins.length; i++) {
// 		admins[i].save(function(err, result) {});
// 	}
// 	console.log('Done: Populating User.');
// }