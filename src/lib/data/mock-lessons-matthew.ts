import type { LessonContent } from "@/lib/types";

type MockLesson = LessonContent & {
  id: string;
  scheduledDate: string;
  isPublished: boolean;
};

export const matthewLessons: MockLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: "21",
    version: 1,
    title: "God Keeps His Promises",
    subtitle: "The Birth of Jesus and the Faithfulness of God",
    date: "2026-09-05",
    scheduledDate: "2026-09-05",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 1:18-25",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>The Gospel of Matthew was written for a community deeply rooted in the Jewish Scriptures. Its opening genealogy traces Jesus\u2019 line from Abraham through David to show that he is the promised Messiah and the rightful heir to David\u2019s throne.</p>" +
          "<p>To understand the story that follows, we need to know how betrothal worked in first-century Jewish culture. Betrothal was far more binding than a modern engagement. It was a formal, legal covenant, usually arranged between families, and required a public ceremony with witnesses. From the moment of betrothal, the woman was legally considered the man\u2019s wife, even though they had not yet begun living together. The betrothal period typically lasted about a year, and breaking it required an actual divorce. Sexual faithfulness during this period was expected and enforced under the same standards as marriage (Deuteronomy 22:23\u201324).</p>" +
          "<p>So when Matthew tells us that Mary \u201cwas found to be with child\u201d before she and Joseph \u201ccame together,\u201d the crisis is severe. Joseph faces public shame, family pressure, and the real possibility that Mary has been unfaithful. Matthew calls him \u201ca just man,\u201d which means he wants to obey God\u2019s law and at the same time protect Mary from the harshest consequences. His plan to divorce her quietly reflects both his righteousness and his compassion.</p>" +
          "<p>Into this crisis, God intervenes through a dream. The angel\u2019s message connects Jesus to the royal line of David (\u201cJoseph, son of David\u201d), to the saving purpose of God (\u201che will save his people from their sins\u201d), and to the ancient prophecy of Isaiah (\u201cImmanuel, God with us\u201d; Isaiah 7:14). Matthew is showing from the very first chapter that this child is the one Israel has been waiting for and that God is faithful to promises made centuries earlier.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost. Then Joseph her husband, being a just man, and not willing to make her a public example, was minded to put her away privily. But while he thought on these things, behold, the angel of the Lord appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost. And she shall bring forth a son, and thou shalt call his name Jesus: for he shall save his people from their sins.</p>",
        reference: "Matthew 1:18-21",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>As we read these verses, I want you to picture Joseph. He is engaged to Mary, he loves her, and then he discovers that she is expecting a child. From his point of view, there is only one explanation, and it is painful. Scripture calls him a \u201crighteous\u201d man, which means he wants to honor God and also protect Mary from shame.</p>" +
          "<p>Joseph decides on a quiet divorce. At that point, God steps in. In a dream, an angel calls him by name, \u201cJoseph, son of David,\u201d and tells him not to be afraid to take Mary as his wife, because what is conceived in her is from the Holy Spirit. The angel goes on to explain the child\u2019s mission: \u201cYou shall call his name Jesus, for he will save his people from their sins.\u201d</p>" +
          "<p>Many of us know what it feels like when life takes a turn we never expected. We do not understand what God is doing, and we are not sure what to do next. In this story, God does not leave Joseph to figure it out alone. He speaks into the confusion, addresses the fear, and gives a next step. In the same way, God knows our situations and is able to meet us through his Word and his Spirit when we feel unsettled.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Matthew presents Joseph as \u201ca just man,\u201d both obedient to the law and compassionate toward Mary (Matthew 1:19).</li>" +
          "<li>The angel addresses him as \u201cson of David,\u201d underlining that Joseph\u2019s legal guardianship places Jesus in David\u2019s royal line (2 Samuel 7:12\u201316; Matthew 1:1).</li>" +
          "<li>The name \u201cJesus\u201d (Yeshua) means \u201cthe Lord saves\u201d and points directly to his mission of saving his people from their sins (Matthew 1:21; Luke 1:31\u201333).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Put yourself in Joseph\u2019s place for a moment. What do you think gave him the courage to trust the angel\u2019s message and move forward?</li>" +
          "<li>When God has spoken into a confusing time in your life, how did it come? Was it through Scripture, a person, prayer, or something else?</li>" +
          "<li>What part of the angel\u2019s message to Joseph encourages you most about the way God communicates with his people?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Now all this was done, that it might be fulfilled which was spoken of the Lord by the prophet, saying, Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us. Then Joseph being raised from sleep did as the angel of the Lord had bidden him, and took unto him his wife: And knew her not till she had brought forth her firstborn son: and he called his name Jesus.</p>",
        reference: "Matthew 1:22-25",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>In these verses, Matthew steps back and explains what is happening beneath the surface. He tells us that all this took place to fulfill what the Lord had spoken through the prophet Isaiah: \u201cBehold, the virgin shall conceive and bear a son, and they shall call his name Immanuel\u201d (Isaiah 7:14). That name means \u201cGod with us.\u201d</p>" +
          "<p>When we look at the baby in the manger, we are not only seeing a special child. We are watching God keep a centuries-old promise and come near to his people in a new and personal way. God stepped into human history, into an ordinary family, into a world that includes fear and danger. He understands what this life feels like because he entered it.</p>" +
          "<p>Now notice Joseph\u2019s response. When he wakes up, he does exactly what the angel commanded. He takes Mary as his wife and later names the child Jesus. He does not know every detail of how God will work this out, but he chooses to trust and obey. In our own lives, we may not understand the full picture either. Like Joseph, we can respond to the light we have and trust God with the rest.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Matthew frequently emphasizes fulfillment of Old Testament Scripture, a key theme of his Gospel (Matthew 2:15, 2:17\u201318, 2:23).</li>" +
          "<li>\u201cImmanuel\u201d from Isaiah 7:14 first assured Judah of God\u2019s presence in a time of crisis. Matthew shows its fullest meaning in Jesus, who is God with us and promises his continuing presence in Matthew 28:20.</li>" +
          "<li>By naming the child, Joseph formally acknowledges Jesus as his legal son, confirming Jesus\u2019 place in the royal line (Matthew 1:25; Luke 2:21).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The name \u201cImmanuel\u201d means \u201cGod with us.\u201d What is one situation in your life right now where you most need to remember that truth?</li>" +
          "<li>Joseph obeyed without knowing how the whole story would turn out. Where is God asking you to take a step of trust even though you cannot see the full picture?</li>" +
          "<li>Think about a promise from God that has proven true over time in your life. How does remembering that strengthen your faith for what you are facing today?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, how will you practice the reality of \u201cGod with us\u201d? Consider choosing one or two moments each day to pause and say, \u201cLord Jesus, thank you that you are with me right now,\u201d and notice what difference that awareness makes.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Put yourself in Joseph\u2019s place for a moment. What do you think gave him the courage to trust the angel\u2019s message and move forward?",
      "When God has spoken into a confusing time in your life, how did it come? Was it through Scripture, a person, prayer, or something else?",
      "What part of the angel\u2019s message to Joseph encourages you most about the way God communicates with his people?",
      "The name \u201cImmanuel\u201d means \u201cGod with us.\u201d What is one situation in your life right now where you most need to remember that truth?",
      "Joseph obeyed without knowing how the whole story would turn out. Where is God asking you to take a step of trust even though you cannot see the full picture?",
      "Think about a promise from God that has proven true over time in your life. How does remembering that strengthen your faith for what you are facing today?",
    ],
  },
  // ==================== LESSON 2 ====================
  {
    id: "22",
    version: 1,
    title: "Wise Men Worship, A Family Flees: God Protects His Son",
    subtitle: "The Visit of the Magi and the Flight to Egypt",
    date: "2026-09-12",
    scheduledDate: "2026-09-12",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 2:1-15",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Matthew 2 introduces us to Herod the Great, a figure well known to historians. Herod ruled Judea as a client king under Rome from about 37 BC until his death around 4 BC. He was half-Jewish (Idumean on his father\u2019s side) and secured his throne through political cunning, Roman backing, and brutal force. He built grand projects including a massive expansion of the Jerusalem temple, the fortress at Masada, and the harbor city of Caesarea Maritima. At the same time, he was deeply paranoid. He executed several of his own sons and one of his wives when he suspected them of plotting against him. The Roman emperor Augustus reportedly joked that it was safer to be Herod\u2019s pig than Herod\u2019s son.</p>" +
          "<p>When Matthew tells us that \u201cwise men from the East\u201d arrived asking about one \u201cborn king of the Jews,\u201d we can see why Herod reacted with terror. \u201cKing of the Jews\u201d was the title Rome had given to Herod himself. Anyone claiming that title was a direct threat to his power. The wise men, or \u201cmagi,\u201d were likely learned advisers from Persia or Babylon who studied the stars and ancient texts. Their long journey shows that word of Israel\u2019s promised king had spread well beyond Jewish borders.</p>" +
          "<p>The religious leaders in Jerusalem can point to the prophecy in Micah 5:2, which names Bethlehem as the birthplace of a ruler who will shepherd God\u2019s people. But they do not go to see the child themselves. Matthew draws a sharp contrast: Gentile outsiders travel far to worship, while insiders who hold the Scriptures remain unmoved.</p>" +
          "<p>After the wise men depart, God warns Joseph to flee to Egypt. Matthew sees this as fulfilling Hosea 11:1, \u201cOut of Egypt I called my son.\u201d Originally this line described Israel\u2019s exodus. Matthew presents Jesus as the true Son who relives Israel\u2019s story. Egypt, which in Scripture serves both as a place of slavery and a place of refuge (Genesis 46; 1 Kings 11:40), now shelters the infant Messiah from a murderous king.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is he that is born King of the Jews? for we have seen his star in the east, and are come to worship him. When Herod the king had heard these things, he was troubled, and all Jerusalem with him. And when he had gathered all the chief priests and scribes of the people together, he demanded of them where Christ should be born. And they said unto him, In Bethlehem of Judaea: for thus it is written by the prophet, And thou Bethlehem, in the land of Juda, art not the least among the princes of Juda: for out of thee shall come a Governor, that shall rule my people Israel. Then Herod, when he had privily called the wise men, enquired of them diligently what time the star appeared. And he sent them to Bethlehem, and said, Go and search diligently for the young child; and when ye have found him, bring me word again, that I may come and worship him also. When they had heard the king, they departed; and, lo, the star, which they saw in the east, went before them, till it came and stood over where the young child was. When they saw the star, they rejoiced with exceeding great joy. And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense and myrrh. And being warned of God in a dream that they should not return to Herod, they departed into their own country another way.</p>",
        reference: "Matthew 2:1-12",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>As we read this passage, I want you to notice the very different responses to Jesus. The wise men arrive in Jerusalem asking, \u201cWhere is he who has been born king of the Jews? We saw his star and have come to worship him.\u201d These are Gentiles from far away, probably learned men who studied the skies. They have traveled a long distance because they believe this child matters.</p>" +
          "<p>Herod hears the question and is troubled. He gathers his chief priests and scribes, who know from Scripture that the Messiah is to be born in Bethlehem (Micah 5:2; Matthew 2:4\u20136). The leaders can quote the prophecy, but they do not seem interested enough to go and see the child themselves. Herod pretends he wants to worship too, but he is actually plotting harm.</p>" +
          "<p>When the wise men follow the star to Bethlehem and finally find Jesus with Mary, they are filled with great joy. They bow down and worship him. They open their treasures and present gifts of gold, frankincense, and myrrh. These are gifts fit for a king, and they hint at Jesus\u2019 royalty, his deity, and his future suffering.</p>" +
          "<p>As we think about this story, I want to invite you to ask yourself, \u201cWhich response to Jesus am I closest to today?\u201d Am I indifferent, like the leaders who had the right information but did not act on it? Am I defensive, like Herod, protecting something I do not want to surrender? Or am I ready to bow in worship like the wise men, even if it costs me something?</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cMagi\u201d or wise men were likely learned advisers who studied the stars and ancient texts; as Gentiles, they preview the nations coming to worship Christ (Matthew 28:19).</li>" +
          "<li>Herod the Great was known for impressive building projects and extreme cruelty, including the killing of some of his own family members.</li>" +
          "<li>The gifts of gold, frankincense, and myrrh are traditionally seen as symbolic: gold for kingship, frankincense for deity, and myrrh for suffering and burial (Psalm 72:10\u201311; Isaiah 60:1\u20136; John 19:39\u201340).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The wise men gave costly gifts and made a long journey to worship Jesus. What is something valuable to you (time, comfort, pride, a habit) that God may be inviting you to lay at his feet?</li>" +
          "<li>The religious leaders knew exactly where the Messiah would be born but did not go. What can \u201cknowing\u201d about Jesus without responding to him look like in our own lives?</li>" +
          "<li>What has the \u201cstar\u201d been for you, the thing that drew you toward Jesus in the first place? How is God still drawing you closer today?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>And when they were departed, behold, the angel of the Lord appeareth to Joseph in a dream, saying, Arise, and take the young child and his mother, and flee into Egypt, and be thou there until I bring thee word: for Herod will seek the young child to destroy him. When he arose, he took the young child and his mother by night, and departed into Egypt: And was there until the death of Herod: that it might be fulfilled which was spoken of the Lord by the prophet, saying, Out of Egypt have I called my son.</p>",
        reference: "Matthew 2:13-15",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>After the wise men leave, God again speaks to Joseph in a dream. The angel tells him, \u201cGet up, take the child and his mother, and flee to Egypt. Stay there until I tell you, for Herod is about to search for the child to destroy him.\u201d Joseph gets up, takes the child and Mary by night, and leaves for Egypt.</p>" +
          "<p>I want you to notice Joseph\u2019s pattern again. Every time God gives him instruction, he responds promptly. He does not give long speeches. He simply obeys. This time obedience means becoming a refugee family in a foreign land. Life in Egypt would not have been comfortable, yet it is the path of protection that God provides.</p>" +
          "<p>Matthew explains that this fulfilled what the Lord had spoken, \u201cOut of Egypt I called my son,\u201d originally referring to Israel\u2019s exodus in Hosea 11:1. Jesus is walking through Israel\u2019s story and living it out in a new way. Even as a powerful king plots violence, God\u2019s purposes move forward without delay. Human evil is real and causes real pain, but it does not get the last word.</p>" +
          "<p>When we face events that seem threatening or chaotic, this passage invites us to remember that God is able to guide, protect, and work out his plan in ways we do not yet see. Like Joseph, our part is to listen and to take the next faithful step.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Egypt appears in Scripture as both a place of bondage and a place of refuge; here it becomes temporary shelter for the holy family (Genesis 46; 1 Kings 11:40; Jeremiah 43:5\u20137).</li>" +
          "<li>Matthew\u2019s use of Hosea 11:1 presents Jesus as the true Son who embodies and fulfills Israel\u2019s calling.</li>" +
          "<li>Joseph\u2019s repeated, prompt obedience to dreams (Matthew 1:24; 2:14; 2:21\u201322) highlights faithful, responsive action under God\u2019s direction.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Joseph obeyed immediately, even when it meant uprooting his family in the middle of the night. What do you think made him respond so quickly, and what can we learn from that kind of responsiveness?</li>" +
          "<li>Has God ever redirected your plans in a way that felt disruptive at first but turned out to be protection? What happened?</li>" +
          "<li>How does this story give you hope when you see evil or injustice that seems to be winning?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, what is one area of your life where you need to trust that God sees the situation and is able to guide and protect? What is one step of obedience you can take this week, even if you cannot see the full outcome?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The wise men gave costly gifts and made a long journey to worship Jesus. What is something valuable to you (time, comfort, pride, a habit) that God may be inviting you to lay at his feet?",
      "The religious leaders knew exactly where the Messiah would be born but did not go. What can \u201cknowing\u201d about Jesus without responding to him look like in our own lives?",
      "What has the \u201cstar\u201d been for you, the thing that drew you toward Jesus in the first place? How is God still drawing you closer today?",
      "Joseph obeyed immediately, even when it meant uprooting his family in the middle of the night. What do you think made him respond so quickly, and what can we learn from that kind of responsiveness?",
      "Has God ever redirected your plans in a way that felt disruptive at first but turned out to be protection? What happened?",
      "How does this story give you hope when you see evil or injustice that seems to be winning?",
    ],
  },
  // ==================== LESSON 3 ====================
  {
    id: "23",
    version: 1,
    title: "Jesus Is Tested and Begins His Work",
    subtitle: "Temptation in the Wilderness and the Light of Galilee",
    date: "2026-09-19",
    scheduledDate: "2026-09-19",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 4:1-17",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>After his baptism in the Jordan, where the Father\u2019s voice declares him the beloved Son and the Spirit descends like a dove, Jesus is immediately led by the Spirit into the Judean wilderness to be tempted by the devil (Matthew 3:16\u20134:1).</p>" +
          "<p>The Judean wilderness is a harsh, rocky desert stretching between Jerusalem and the Dead Sea. First-century Jews regarded it as a place of both danger and divine encounter. Israel had been tested in the wilderness for forty years after the exodus, and that experience shaped the nation\u2019s identity. Moses fasted for forty days on Mount Sinai (Exodus 34:28), and Elijah traveled forty days to Mount Horeb (1 Kings 19:8). By spending forty days and nights fasting in the same landscape, Jesus deliberately walks in the footsteps of Israel\u2019s story, but where Israel grumbled and failed, he remains faithful.</p>" +
          "<p>The exchange between Jesus and the devil follows the pattern of rabbinic debate. In Jewish scholarship, a teacher would answer a challenge by quoting an authoritative text from Torah. The devil quotes Scripture (Psalm 91:11\u201312), and Jesus answers with Scripture (Deuteronomy 8:3, 6:16, 6:13). All three of Jesus\u2019 answers come from Deuteronomy 6\u20138, the very chapters where Moses reflects on Israel\u2019s wilderness testing. Dead Sea Scrolls found at Qumran confirm that Deuteronomy 8:3 was frequently copied and highly valued among Jews in this period, so Jesus\u2019 choice of text would have carried recognized authority.</p>" +
          "<p>After overcoming temptation, Jesus settles in Capernaum in Galilee and begins to preach. Galilee was a mixed, heavily taxed region under Roman oversight, often looked down on by Judeans to the south. Matthew quotes Isaiah 9:1\u20132 to explain that Jesus\u2019 ministry in this overlooked region is the fulfillment of a promise: a great light shining on people who sit in darkness and the shadow of death. His opening message, \u201cRepent, for the kingdom of heaven is at hand,\u201d announces that God\u2019s saving reign has arrived in his person.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days and forty nights, he was afterward an hungred. And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread. But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God. Then the devil taketh him up into the holy city, and setteth him on a pinnacle of the temple, And saith unto him, If thou be the Son of God, cast thyself down: for it is written, He shall give his angels charge concerning thee: and in their hands they shall bear thee up, lest at any time thou dash thy foot against a stone. Jesus said unto him, It is written again, Thou shalt not tempt the Lord thy God. Again, the devil taketh him up into an exceeding high mountain, and sheweth him all the kingdoms of the world, and the glory of them; And saith unto him, All these things will I give thee, if thou wilt fall down and worship me. Then saith Jesus unto him, Get thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve. Then the devil leaveth him, and, behold, angels came and ministered unto him.</p>",
        reference: "Matthew 4:1-11",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>As we walk through this passage, I want you to picture the scene. Jesus has just heard the Father say, \u201cThis is my beloved Son,\u201d and then the Spirit leads him straight into the wilderness. For forty days and nights he fasts. He is hungry, alone, and physically weak. Right there, when he seems most vulnerable, the devil comes.</p>" +
          "<p>The first temptation targets his hunger. Satan suggests, \u201cIf you are the Son of God, command these stones to become bread.\u201d Jesus could have done it. He has the power. But he answers with Scripture: \u201cMan shall not live by bread alone, but by every word that comes from the mouth of God\u201d (Deuteronomy 8:3). He chooses to trust his Father\u2019s timing instead of using his power for his own relief.</p>" +
          "<p>The second temptation urges Jesus to throw himself off the temple and force God to rescue him, quoting Scripture out of context. Jesus answers, \u201cYou shall not put the Lord your God to the test\u201d (Deuteronomy 6:16). He refuses to demand proof of the Father\u2019s love.</p>" +
          "<p>The third temptation offers all the kingdoms of the world in exchange for worshiping the devil. Jesus responds, \u201cYou shall worship the Lord your God and him only shall you serve\u201d (Deuteronomy 6:13). He will receive the kingdom the Father\u2019s way, through obedience and the cross, not through shortcuts.</p>" +
          "<p>When we face temptation, it often follows similar patterns: meeting a real need in the wrong way, demanding that God prove himself, or grabbing power and control. Jesus shows us a different path. He leans on God\u2019s Word, trusts the Father\u2019s goodness, and stays loyal in worship. Because he never gave in, he knows the full weight of temptation and is able to help us when we are tested.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The forty days in the wilderness echo Israel\u2019s forty years in the desert and Moses\u2019 forty-day fasts (Deuteronomy 8:2\u20133; Deuteronomy 9:9, 18).</li>" +
          "<li>Each response of Jesus comes from Deuteronomy, underscoring his identification with Israel and his reliance on Scripture.</li>" +
          "<li>Hebrews draws on this episode to affirm that Jesus was tempted in every way as we are yet without sin and can sympathize with our weaknesses (Hebrews 2:18; Hebrews 4:15\u201316).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>If you look at the three temptations (satisfying a legitimate need the wrong way, demanding proof from God, and grasping for control), which pattern feels most familiar in your own life right now?</li>" +
          "<li>Jesus answered every temptation with a specific passage of Scripture. Is there a verse or truth that has helped you stand firm in a time of testing? What was it, and how did it help?</li>" +
          "<li>Jesus was tempted right after a high point (his baptism). Have you noticed that temptation sometimes shows up after a good season? What can we learn from Jesus about being prepared for that?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Now when Jesus had heard that John was cast into prison, he departed into Galilee; And leaving Nazareth, he came and dwelt in Capernaum, which is upon the sea coast, in the borders of Zabulon and Nephthalim: That it might be fulfilled which was spoken by Esaias the prophet, saying, The land of Zabulon, and the land of Nephthalim, by the way of the sea, beyond Jordan, Galilee of the Gentiles; The people which sat in darkness saw great light; and to them which sat in the region and shadow of death light is sprung up. From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.</p>",
        reference: "Matthew 4:12-17",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Matthew tells us that when Jesus hears John the Baptist has been arrested, he withdraws to Galilee and settles in Capernaum, by the Sea of Galilee, in the region of Zebulun and Naphtali. This is not the religious center of Jerusalem. It is a mixed, often looked-down-on area called \u201cGalilee of the Gentiles.\u201d</p>" +
          "<p>Matthew explains that this move fulfills Isaiah 9:1\u20132, which speaks of people living in darkness who see a great light. Jesus is that light. Into a region marked by struggle and spiritual need, he comes preaching, healing, and calling disciples.</p>" +
          "<p>Verse 17 summarizes his message: \u201cRepent, for the kingdom of heaven is at hand.\u201d Repentance means turning around, changing direction, bringing our hearts and lives into line with God\u2019s reign. And this call is not only for people who have never believed. It is also a daily posture for followers of Jesus who want to walk in his light.</p>" +
          "<p>So as we think about Jesus coming out of the wilderness and beginning his work, we see a pattern. He resists darkness in private, then shines light in public. He trusts his Father in the hidden place, then invites others to do the same. He steps into overlooked places on purpose and brings hope there.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cGalilee of the Gentiles\u201d highlights the mixed population of the region and foreshadows the gospel\u2019s spread to all nations (Isaiah 9:1\u20132; Matthew 28:18\u201320).</li>" +
          "<li>The \u201ckingdom of heaven\u201d in Matthew is functionally equivalent to \u201ckingdom of God\u201d and refers to God\u2019s saving reign breaking into the world through Jesus.</li>" +
          "<li>The link between John\u2019s message in Matthew 3:2 and Jesus\u2019 in Matthew 4:17 shows continuity; Jesus fulfills and deepens what John began (John 3:28\u201330; Matthew 11:2\u20135).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus is called a \u201cgreat light\u201d for people in darkness. Where have you experienced his light breaking into a dark season of your life, and what did that look like?</li>" +
          "<li>If repentance is an ongoing \u201cturning toward God,\u201d what is one area where you sense him inviting a fresh turn right now, whether in your thinking, your habits, or your relationships?</li>" +
          "<li>Jesus began his work in a region people looked down on. How does that encourage you about the places and situations God might choose to work through you?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, choose one specific temptation or \u201cdark\u201d area you face. What is one verse you can hold onto and one small step of obedience you can take to turn toward Jesus as your light in that place?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "If you look at the three temptations (satisfying a legitimate need the wrong way, demanding proof from God, and grasping for control), which pattern feels most familiar in your own life right now?",
      "Jesus answered every temptation with a specific passage of Scripture. Is there a verse or truth that has helped you stand firm in a time of testing? What was it, and how did it help?",
      "Jesus was tempted right after a high point (his baptism). Have you noticed that temptation sometimes shows up after a good season? What can we learn from Jesus about being prepared for that?",
      "Jesus is called a \u201cgreat light\u201d for people in darkness. Where have you experienced his light breaking into a dark season of your life, and what did that look like?",
      "If repentance is an ongoing \u201cturning toward God,\u201d what is one area where you sense him inviting a fresh turn right now, whether in your thinking, your habits, or your relationships?",
      "Jesus began his work in a region people looked down on. How does that encourage you about the places and situations God might choose to work through you?",
    ],
  },
  // ==================== LESSON 4 ====================
  {
    id: "24",
    version: 1,
    title: "Blessed Are the Poor in Spirit and Those Who Mourn",
    subtitle: "The First Two Beatitudes",
    date: "2026-09-26",
    scheduledDate: "2026-09-26",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 5:1-4",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>The Sermon on the Mount (Matthew 5\u20137) is the first of five major teaching sections in Matthew\u2019s Gospel. It was delivered to both disciples and a wider crowd, probably about two years into Jesus\u2019 public ministry, somewhere on the hills near Capernaum overlooking the Sea of Galilee.</p>" +
          "<p>Many scholars have noted that Matthew presents Jesus going \u201cup on the mountain\u201d to teach in a way that echoes Moses going up Mount Sinai to receive the Law. Just as Moses delivered God\u2019s instruction from the mountain, Jesus now sits down (the posture of an authoritative Jewish teacher) and delivers his own instruction about life in God\u2019s kingdom.</p>" +
          "<p>The \u201cbeatitude\u201d was a familiar form in Jewish literature. The Hebrew word <em>ashre</em> (\u201cblessed\u201d or \u201chappy\u201d) opens many psalms and proverbs: \u201cBlessed is the man who walks not in the counsel of the wicked\u201d (Psalm 1:1); \u201cBlessed is the one whose transgression is forgiven\u201d (Psalm 32:1). Similar blessing statements appear in later Jewish texts such as the Slavonic Book of Enoch and in wisdom writings found among the Dead Sea Scrolls. So when Jesus says \u201cblessed are,\u201d his audience hears a form they recognize. What surprises them is who he calls blessed: the poor in spirit, those who mourn, the meek, the merciful.</p>" +
          "<p>The people listening lived under Roman occupation in a society driven by honor and shame, patronage, and limited access to resources. Wealth, status, and religious achievement were the recognized paths to blessing. Jesus overturns those expectations. He announces that the kingdom belongs to those who know they are spiritually empty and that comfort belongs to those who grieve, whether over personal loss, their own sin, or the broken state of the world. For a crowd that included the poor, the sick, and the marginalized (Matthew 4:23\u201325), these words were radical good news.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him: And he opened his mouth, and taught them, saying, Blessed are the poor in spirit: for theirs is the kingdom of heaven.</p>",
        reference: "Matthew 5:1-3",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>As Jesus sits down on the hillside and begins to teach, the very first people he calls \u201cblessed\u201d are not the successful or the powerful. He says, \u201cBlessed are the poor in spirit, for theirs is the kingdom of heaven.\u201d</p>" +
          "<p>\u201cPoor in spirit\u201d does not mean having a low bank account. It means recognizing that, spiritually, we are needy. We do not come to God with full hands, as if we can pay our own way. We come empty, aware that we depend on his mercy.</p>" +
          "<p>If you think about your own life, you may remember times when you felt especially aware of your weakness: a failure you could not fix, a season where your own strength ran out, or a quiet moment when you realized you needed God more than you had been letting on. Jesus is saying that people who come to God at that point, without pretending, are in a place of blessing. The kingdom of heaven does not wait for them in the distant future only. In some real sense, it already \u201cbelongs\u201d to them.</p>" +
          "<p>So as we hear this Beatitude, we are invited to stop acting as though we have it all together. Instead, we can say honestly, \u201cLord, I need you.\u201d According to Jesus, that posture is not a disgrace. It is a doorway.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cPoor\u201d language in the Old Testament often refers to those who are humble and rely on God\u2019s help (Psalm 34:6; Psalm 40:17; Isaiah 57:15).</li>" +
          "<li>The phrase \u201ctheirs is the kingdom of heaven\u201d appears in both the first and the last Beatitude (Matthew 5:3, 5:10), forming a frame around the whole list.</li>" +
          "<li>Matthew\u2019s \u201ckingdom of heaven\u201d is functionally equivalent to \u201ckingdom of God\u201d and reflects Jewish reverence for God\u2019s name.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Most of us are trained to appear strong and self-sufficient. What would it look like in your daily life to genuinely live as someone who is \u201cpoor in spirit\u201d without that becoming mere self-pity?</li>" +
          "<li>Jesus ties the kingdom of heaven directly to those who know they need God. How does that reshape the way you think about success and weakness?</li>" +
          "<li>When have you experienced a surprising gift from God that came precisely at a moment of emptiness or need?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Blessed are they that mourn: for they shall be comforted.</p>",
        reference: "Matthew 5:4",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Next Jesus says, \u201cBlessed are those who mourn, for they shall be comforted.\u201d Mourning here is broad. It can include grief over someone we have lost, sorrow over our own sin, and sadness over the brokenness of the world.</p>" +
          "<p>Notice that Jesus does not rush past grief. He does not say, \u201cBlessed are those who keep a stiff upper lip.\u201d He speaks a blessing right into the middle of tears. Many of us know what it is to mourn, whether we show it openly or carry it quietly.</p>" +
          "<p>According to Jesus, people who bring that mourning into God\u2019s presence are not abandoned. \u201cThey shall be comforted.\u201d Some of that comfort arrives now through God\u2019s presence, his promises, and his people. Some of it waits for the day when he will wipe away every tear and set all things right (Revelation 21:4). But the promise is sure. Grief in God\u2019s hands is not wasted. It can become a place where we meet him more deeply than we would in comfort alone.</p>" +
          "<p>So when we hear this Beatitude, we can give ourselves permission to be honest about what hurts, and we can bring it to the God who sees rather than carrying it alone. Jesus says that is a place of blessing, not of shame.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The mourning can include sorrow over personal sin and over the broken state of God\u2019s world, paralleling Old Testament laments (Psalm 51:17; Joel 2:12\u201313).</li>" +
          "<li>The promise of comfort connects with Isaiah\u2019s vision of God comforting his people and binding up the brokenhearted (Isaiah 40:1\u20132; Isaiah 61:1\u20133).</li>" +
          "<li>Jesus\u2019 blessings on the poor and those who mourn anticipate the reversal theme also seen in Luke\u2019s Beatitudes (Luke 6:20\u201323).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Our culture often treats grief as something to get over quickly. How does Jesus\u2019 promise here challenge that, and what does a healthier approach to mourning look like?</li>" +
          "<li>Has mourning ever deepened your faith or drawn you closer to God in a way you did not expect? What happened?</li>" +
          "<li>Who around you might be mourning right now, and what is one specific, practical way you could bring some of God\u2019s comfort to them this week?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, choose one area where you feel either poor in spirit or weighed down by grief. How will you bring that to God in a concrete way, such as through a written prayer, a conversation with a trusted believer, or spending time in a psalm of lament? And as you do, pay attention to the ways God meets you there.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Most of us are trained to appear strong and self-sufficient. What would it look like in your daily life to genuinely live as someone who is \u201cpoor in spirit\u201d without that becoming mere self-pity?",
      "Jesus ties the kingdom of heaven directly to those who know they need God. How does that reshape the way you think about success and weakness?",
      "When have you experienced a surprising gift from God that came precisely at a moment of emptiness or need?",
      "Our culture often treats grief as something to get over quickly. How does Jesus\u2019 promise here challenge that, and what does a healthier approach to mourning look like?",
      "Has mourning ever deepened your faith or drawn you closer to God in a way you did not expect? What happened?",
      "Who around you might be mourning right now, and what is one specific, practical way you could bring some of God\u2019s comfort to them this week?",
    ],
  },
  // ==================== LESSON 5 ====================
  {
    id: "25",
    version: 1,
    title: "Blessed Are the Meek and the Merciful",
    subtitle: "Beatitudes on Gentleness, Righteousness, Mercy, Purity, and Peace",
    date: "2026-10-03",
    scheduledDate: "2026-10-03",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 5:5-9",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>As Jesus continues the Beatitudes, he blesses the meek, those who hunger for righteousness, the merciful, the pure in heart, and the peacemakers. Each of these traits has deep roots in the Hebrew Scriptures and would have resonated with a Jewish audience familiar with the Psalms, the Prophets, and the wisdom tradition.</p>" +
          "<p>\u201cBlessed are the meek, for they shall inherit the earth\u201d draws directly from Psalm 37:11, where the humble who trust in the Lord are promised the land while the wicked are cut off. In a culture under Roman military power, where political zealots wanted to overthrow the occupation by force, Jesus\u2019 blessing on the meek was countercultural. He was saying that God\u2019s future belongs to those who submit their strength to him, not to those who seize it by violence.</p>" +
          "<p>The hunger and thirst for \u201crighteousness\u201d would have been heard in both a personal and a social sense. First-century Jewish listeners lived with a longing for God to set things right: to end the oppression of Rome, to purify worship, and to fulfill the promises of the prophets. Jesus affirms that longing but redirects it. True righteousness begins in the heart and flows from relationship with God, not from political revolution or rigid rule-keeping.</p>" +
          "<p>\u201cMercy\u201d (<em>hesed</em> in Hebrew) is one of the most important words in the Old Testament. It describes God\u2019s loyal, covenant love toward his people (Exodus 34:6; Hosea 6:6). When Jesus blesses the merciful, he is calling people to reflect the very character of God. \u201cPure in heart\u201d echoes Psalm 24:3\u20134 and Psalm 51:10, where inner integrity, not mere outward performance, qualifies a person to stand in God\u2019s presence. And \u201cpeacemaker\u201d (<em>shalom</em>-maker) goes beyond avoiding conflict. In Hebrew thought, <em>shalom</em> means wholeness, flourishing, and right relationship. Those who actively work to bring that kind of peace are called \u201csons of God\u201d because they resemble their Father, who is himself the God of peace (Romans 16:20; Colossians 1:19\u201320).</p>" +
          "<p>Taken together, these Beatitudes paint a picture of kingdom people who are gentle rather than grasping, who long for God\u2019s justice, who extend mercy because they have received it, who pursue inner integrity over outward show, and who actively build bridges rather than walls. In a world of Roman power, religious rivalry, and social division, this vision was both stunning and hopeful.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Blessed are the meek: for they shall inherit the earth. Blessed are they which do hunger and thirst after righteousness: for they shall be filled.</p>",
        reference: "Matthew 5:5-6",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus says, \u201cBlessed are the meek, for they shall inherit the earth.\u201d Meekness is often misunderstood. It is not weakness or passivity. It is strength that is submitted to God, a quiet, steady spirit that does not have to push its own way. Jesus himself later describes his own heart as \u201cgentle and lowly.\u201d</p>" +
          "<p>If you think of people you admire in the faith, many of them may not be loud or forceful. They are steady, patient, and kind. They absorb wrongs without needing to strike back. Jesus says people like that will \u201cinherit the earth.\u201d That is a promise borrowed from Psalm 37, where those who trust in the Lord, rather than fight evil in their own strength, are the ones who finally enjoy what God gives.</p>" +
          "<p>Jesus then says, \u201cBlessed are those who hunger and thirst for righteousness, for they shall be satisfied.\u201d This is a strong desire, like the ache of real hunger or thirst. It includes a longing to be right with God and a longing to see God\u2019s ways done in our world. When we are troubled by injustice, by our own sin, or by broken relationships, that longing is part of this hunger. Jesus promises that such a desire will not be ignored. God will satisfy it, partly now as he changes us and works through us, and completely in his kingdom.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cMeek\u201d recalls Moses and the Servant of the Lord, who are strong yet gentle under God\u2019s hand (Numbers 12:3; Isaiah 42:1\u20133; Matthew 11:29).</li>" +
          "<li>\u201cInherit the earth\u201d echoes Psalm 37:9\u201311, where those who hope in the Lord, rather than fret over evildoers, receive the land as a gift.</li>" +
          "<li>\u201cRighteousness\u201d in Matthew includes both right relationship with God and living in ways that reflect his justice and goodness (Matthew 5:20; Matthew 6:33).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>When you think of someone who is meek in the best sense of the word, who comes to mind, and what do you see in them that you would like God to grow in you?</li>" +
          "<li>Where do you see signs that God has already been growing meekness or a hunger for righteousness in your own life, even if the growth has been slow?</li>" +
          "<li>If God promises to \u201csatisfy\u201d those who hunger and thirst for righteousness, what are you hopeful he will one day set right\u2014in you or in the world?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p>Blessed are the merciful: for they shall obtain mercy. Blessed are the pure in heart: for they shall see God. Blessed are the peacemakers: for they shall be called the children of God.</p>",
        reference: "Matthew 5:7-9",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus continues, \u201cBlessed are the merciful, for they shall receive mercy.\u201d Mercy is compassion that moves toward action. It is choosing to forgive, to help, or to stand with someone in need, even when they do not \u201cdeserve\u201d it. Jesus is not saying that we earn God\u2019s mercy by showing mercy. Instead, people who have tasted God\u2019s mercy are set free to extend it to others, and as they do, they remain open to receive still more of his kindness.</p>" +
          "<p>\u201cBlessed are the pure in heart, for they shall see God.\u201d Purity here is not about a perfect record but about a heart that is undivided in its devotion. It is a deep desire to love God sincerely, without pretending. Over time, as we walk with Christ, he cleanses and focuses our hearts so that we can recognize his presence and work more clearly. The promise \u201cthey shall see God\u201d looks ahead to the day when God\u2019s people will see him face to face, and even now we begin to \u201csee\u201d him by faith.</p>" +
          "<p>\u201cBlessed are the peacemakers, for they shall be called sons of God.\u201d Peacemakers are not people who simply avoid conflict at all costs. They are people who, as far as it depends on them, work to bring God\u2019s wholeness into damaged relationships. They listen, they apologize when needed, they help others reconcile. They bear a family resemblance to their Father, who sent Jesus as the ultimate peacemaker to bring us back to himself.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Mercy is central in Matthew; Jesus quotes Hosea 6:6 (\u201cI desire mercy, and not sacrifice\u201d) and warns against neglecting \u201cjustice, mercy, and faithfulness\u201d (Matthew 9:13; Matthew 12:7; Matthew 23:23).</li>" +
          "<li>\u201cPure in heart\u201d connects with Psalm 24:3\u20134 and Psalm 51:10, where inner purity prepares a person to dwell in God\u2019s presence.</li>" +
          "<li>Peacemaking reflects God\u2019s reconciling work through Christ (Ephesians 2:14\u201317; Colossians 1:19\u201320) and anticipates the family likeness of God\u2019s children (Romans 8:14).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Where have you recently seen mercy, purity of heart, or peacemaking in action\u2014in your church, your family, or the wider world? What encouraged you about it?</li>" +
          "<li>Looking at your own life, which of these three (mercy, purity of heart, peacemaking) do you sense God especially inviting you to grow in right now, and what is one hopeful step in that direction?</li>" +
          "<li>How might your relationships change if you approached them consciously as a \u201cchild of God,\u201d representing your Father\u2019s mercy and peace?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, choose one of these Beatitudes (meek, hungry for righteousness, merciful, pure in heart, or peacemaker). What is one specific, realistic way you can cooperate with God in living that out in your words or actions?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "When you think of someone who is meek in the best sense of the word, who comes to mind, and what do you see in them that you would like God to grow in you?",
      "Where do you see signs that God has already been growing meekness or a hunger for righteousness in your own life, even if the growth has been slow?",
      "If God promises to \u201csatisfy\u201d those who hunger and thirst for righteousness, what are you hopeful he will one day set right\u2014in you or in the world?",
      "Where have you recently seen mercy, purity of heart, or peacemaking in action\u2014in your church, your family, or the wider world? What encouraged you about it?",
      "Looking at your own life, which of these three (mercy, purity of heart, peacemaking) do you sense God especially inviting you to grow in right now, and what is one hopeful step in that direction?",
      "How might your relationships change if you approached them consciously as a \u201cchild of God,\u201d representing your Father\u2019s mercy and peace?",
    ],
  },
  // ==================== LESSON 6 ====================
  {
    id: "26",
    version: 1,
    title: "Salt and Light",
    subtitle: "Living for God Where You Are",
    date: "2026-10-10",
    scheduledDate: "2026-10-10",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 5:13-16",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Immediately after the Beatitudes, Jesus makes two bold declarations: \u201cYou are the salt of the earth\u201d and \u201cYou are the light of the world.\u201d To grasp the weight of these images, we need to understand what salt and light meant in the first-century world.</p>" +
          "<p>Salt was one of the most valuable commodities in antiquity. Roman soldiers were sometimes paid in salt (the origin of the English word \u201csalary\u201d), and in the ancient Near East salt was used not only to season food but to preserve it, to purify, and to seal covenants. In Jewish practice, every grain offering in the temple was seasoned with salt, called \u201cthe salt of the covenant\u201d (Leviticus 2:13; Numbers 18:19). Salt symbolized loyalty, enduring relationship, and the capacity to slow decay. When Jesus calls his followers \u201cthe salt of the earth,\u201d he is saying that their presence in the world preserves, purifies, and flavors it with God\u2019s grace.</p>" +
          "<p>The salt available in Palestine was mainly rock salt from deposits near the Dead Sea. Unlike refined modern salt, it was a mineral mixture. If the actual salt content leached out or was contaminated by gypsum, the remaining powder looked like salt but had lost its taste and was literally good for nothing but to be thrown on pathways. Jesus\u2019 warning about salt losing its flavor would have been a vivid, recognizable picture.</p>" +
          "<p>Light imagery runs deep in the Hebrew Scriptures. Israel was called to be \u201ca light for the nations\u201d (Isaiah 42:6; 49:6), carrying the knowledge of God to the world. In the Sermon on the Mount, Jesus now transfers that calling to his disciples: \u201cYou are the light of the world\u201d (Matthew 5:14). A lamp on a stand and a city set on a hill are pictures of visible, purposeful shining. The goal is not self-display but doxology: \u201cLet your light shine before others, so that they may see your good works and give glory to your Father who is in heaven\u201d (Matthew 5:16).</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>13</sup> Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men.</p>",
        reference: "Matthew 5:13",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>I want you to hear the confidence in Jesus\u2019 words here. He does not say, \u201cTry to become the salt of the earth.\u201d He says, \u201cYou are the salt of the earth.\u201d That is an identity statement. If you belong to Jesus, you already have something the world needs.</p>" +
          "<p>Think about what salt does. It preserves. It seasons. It makes you thirsty for more. In the same way, our faithfulness, our prayers, our honesty, and our kindness can slow down moral decay around us and make people hungry for God. That influence does not require a stage or a title. It happens in conversations, in the way we treat people, and in the quiet choices no one else sees.</p>" +
          "<p>Jesus also warns that if salt loses its flavor, it is useless. That is a sobering thought. We can go through the motions of faith and gradually lose our distinctive character. We blend in. We stop making a difference. Jesus is asking us to consider whether our lives still carry the tang of the kingdom or whether the flavor has gone flat.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>In the ancient world, salt was so valuable that a king releasing his subjects from a salt tax was considered a major act of generosity (1 Maccabees 10:29; 11:35).</li>" +
          "<li>\u201cSalt of the covenant\u201d language (Leviticus 2:13; Numbers 18:19; 2 Chronicles 13:5) links salt to enduring faithfulness, which deepens Jesus\u2019 metaphor about the covenant loyalty his followers should embody.</li>" +
          "<li>The idea of salt losing its saltiness likely refers to the impure rock salt from the Dead Sea region, where the sodium chloride could leach away leaving a chalky, useless residue (Luke 14:34\u201335).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>If salt preserves, seasons, and makes people thirsty, which of those roles do you think God is most calling you to play in your current circle of relationships?</li>" +
          "<li>Jesus warns that salt can lose its flavor. What tends to cause your faith to \u201cgo flat,\u201d and what has helped you get the flavor back?</li>" +
          "<li>Who is someone whose quiet, \u201csalty\u201d faithfulness has influenced your life? What specifically did they do that made a difference?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>14</sup> Ye are the light of the world. A city that is set on an hill cannot be hid. <sup>15</sup> Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house. <sup>16</sup> Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.</p>",
        reference: "Matthew 5:14-16",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus now shifts images: \u201cYou are the light of the world. A city set on a hill cannot be hidden.\u201d He adds that no one lights a lamp and puts it under a basket. You put it on a stand so it gives light to the whole house.</p>" +
          "<p>There is something bold about this claim. In John\u2019s Gospel, Jesus calls himself \u201cthe light of the world\u201d (John 8:12). Here he extends that identity to his followers. We are not the source of the light, but we reflect it. Like the moon reflecting the sun, our lives are meant to show others what Jesus is like.</p>" +
          "<p>Then Jesus gives the purpose: \u201cLet your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.\u201d The point is not to show how impressive we are. The point is that when people see kindness, integrity, patience, or generosity coming from a follower of Christ, they begin to glimpse the God who inspires it.</p>" +
          "<p>You may feel that your light is small, a candle rather than a spotlight. That is fine. In a dark room, even a candle changes everything. The question is not how bright your light is, but whether you are willing to let it shine.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Israel was called to be \u201ca light for the nations\u201d (Isaiah 42:6; Isaiah 49:6; Isaiah 60:1\u20133), a calling Jesus now extends to his community of disciples.</li>" +
          "<li>First-century houses in Galilee were small and often had only one room. A single oil lamp on a stand would illuminate the whole space, making Jesus\u2019 illustration vivid and practical.</li>" +
          "<li>The purpose of visible good works is doxological: the goal is that observers praise God (1 Peter 2:12).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus says a city on a hill cannot be hidden. In what ways does your life already shine, even in small or unnoticed ways?</li>" +
          "<li>What is one \u201cgood work\u201d you could do this week that might cause someone to notice the goodness of God rather than your own effort?</li>" +
          "<li>If hiding your light means playing it safe with your faith, where do you sense God asking you to be a little braver?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, choose one specific place or relationship where you will intentionally be \u201csalt and light.\u201d What will you do, and what difference might it make?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "If salt preserves, seasons, and makes people thirsty, which of those roles do you think God is most calling you to play in your current circle of relationships?",
      "Jesus warns that salt can lose its flavor. What tends to cause your faith to \u201cgo flat,\u201d and what has helped you get the flavor back?",
      "Who is someone whose quiet, \u201csalty\u201d faithfulness has influenced your life? What specifically did they do that made a difference?",
      "Jesus says a city on a hill cannot be hidden. In what ways does your life already shine, even in small or unnoticed ways?",
      "What is one \u201cgood work\u201d you could do this week that might cause someone to notice the goodness of God rather than your own effort?",
      "If hiding your light means playing it safe with your faith, where do you sense God asking you to be a little braver?",
    ],
  },
  // ==================== LESSON 7 ====================
  {
    id: "27",
    version: 1,
    title: "Do Not Worry: God Cares for You",
    subtitle: "Trusting the Father Who Provides",
    date: "2026-10-17",
    scheduledDate: "2026-10-17",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 6:25-34",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>In the middle of the Sermon on the Mount, Jesus speaks directly to the problem of anxiety. His command \u201cdo not be anxious\u201d appears six times in these ten verses, making worry the clear target of the passage.</p>" +
          "<p>This teaching comes right after Jesus says, \u201cYou cannot serve both God and money\u201d (Matthew 6:24). His logic flows naturally: if we try to serve money and security as a master, anxiety is the inevitable result. But if God is our master, we can trust his care.</p>" +
          "<p>To appreciate the force of Jesus\u2019 words, we need to remember the economic reality of first-century Galilee. Most of his listeners were peasant farmers, fishermen, or day laborers who lived close to the margin. They depended on each season\u2019s harvest and each day\u2019s wages. Roman taxation was heavy, and political upheaval was always a threat. Food, drink, and clothing were not abstract concerns. They were daily survival questions. Yet into that precarious world Jesus says, \u201cDo not be anxious about your life.\u201d</p>" +
          "<p>Jesus appeals to creation as evidence of the Father\u2019s care: birds that are fed without farming, wildflowers that are clothed more beautifully than Solomon in all his royal splendor. The mention of Solomon is significant. Solomon was the wealthiest king in Israel\u2019s history, yet his riches did not bring lasting peace, and his kingdom eventually fractured. Jesus is saying that his Father\u2019s ordinary provision for sparrows and lilies outshines the most spectacular human wealth.</p>" +
          "<p>He then draws a contrast between his disciples and \u201cthe Gentiles\u201d who chase after material security. Israel was called to be distinct, to trust their covenant God rather than scramble like nations who did not know him. Jesus reminds his followers of that calling and redirects their energy: \u201cSeek first the kingdom of God and his righteousness, and all these things will be added to you.\u201d</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>25</sup> Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment? <sup>26</sup> Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they? <sup>27</sup> Which of you by taking thought can add one cubit unto his stature? <sup>28</sup> And why take ye thought for raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin: <sup>29</sup> And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these. <sup>30</sup> Wherefore, if God so clothe the grass of the field, which to day is, and to morrow is cast into the oven, shall he not much more clothe you, O ye of little faith?</p>",
        reference: "Matthew 6:25-30",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus opens with a strong statement: \u201cDo not be anxious about your life, what you will eat or what you will drink, nor about your body, what you will put on.\u201d Then he asks a question designed to change our perspective: \u201cIs not life more than food, and the body more than clothing?\u201d</p>" +
          "<p>He points to the birds. They do not plant, harvest, or store in barns, yet your heavenly Father feeds them. \u201cAre you not of more value than they?\u201d He points to the wildflowers. They do not work or spin thread, yet Solomon at the peak of his glory was not dressed like one of them.</p>" +
          "<p>I want you to feel the logic of his argument. If God pays this much attention to creatures that live for a season, how much more will he attend to you, a person made in his image, whom he calls his child? Jesus is not shaming us for having needs. He is redirecting our gaze from the problem to the Provider.</p>" +
          "<p>He gently names the issue: \u201cO you of little faith.\u201d That phrase appears several times in Matthew, and each time it carries tenderness alongside challenge. Jesus is saying, \u201cYou have faith, but there is more available to you. Let your trust grow.\u201d</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The Greek word for worry (<em>merimna\u014d</em>) can mean to be divided in mind or pulled apart. Worry literally splits our attention between God and our circumstances.</li>" +
          "<li>Jesus\u2019 argument moves from lesser to greater: if God cares for birds and flowers, he will certainly care for humans who bear his image (Genesis 1:26\u201327).</li>" +
          "<li>\u201cO you of little faith\u201d (<em>oligopistos</em>) appears also in Matthew 8:26, 14:31, and 16:8, always as a gentle correction aimed at those who already believe but struggle to trust fully.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>When you picture the birds and the flowers, what do they teach you about the way God provides? What part of that picture is hardest for you to apply to your own life?</li>" +
          "<li>Jesus says worry cannot add a single hour to your life. What is one worry you are carrying right now that you know is not actually helping you?</li>" +
          "<li>Has there been a time when you looked back and realized God had been providing all along, even though you could not see it in the moment?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>31</sup> Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? <sup>32</sup> (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things. <sup>33</sup> But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. <sup>34</sup> Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.</p>",
        reference: "Matthew 6:31-34",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus repeats his command not to worry and then gives this remarkable instruction: \u201cSeek first the kingdom of God and his righteousness, and all these things will be added to you.\u201d That word \u201cfirst\u201d is the key. Jesus is not saying needs do not matter. He is saying that when we put God\u2019s rule and God\u2019s ways at the top of our priorities, we can trust him to handle the rest.</p>" +
          "<p>Then comes a very practical sentence: \u201cDo not be anxious about tomorrow, for tomorrow will worry about itself. Sufficient for the day is its own trouble.\u201d There is almost a touch of humor here. Each day has enough challenges. We do not need to borrow trouble from next week.</p>" +
          "<p>I think most of us can relate to the pattern of stacking worries. We take today\u2019s concern, add next month\u2019s uncertainty, pile on a worst-case scenario, and suddenly we are crushed under a weight that has not even arrived yet. Jesus is calling us back to the present day and to the Father who meets us in it.</p>" +
          "<p>Seeking the kingdom first might look like starting the day with a moment of trust: \u201cFather, this day belongs to you.\u201d It might mean choosing generosity when anxiety says hoard. It might mean praying before problem-solving. It is a daily reorientation of the heart that changes how we carry everything else.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The contrast between disciples and \u201cthe Gentiles\u201d who \u201cseek after all these things\u201d echoes Israel\u2019s calling to be distinct, trusting their covenant God rather than living like the nations (Deuteronomy 4:7\u20138; Matthew 5:47).</li>" +
          "<li>\u201cSeek first the kingdom of God\u201d summarizes much of the Sermon on the Mount and parallels other calls to prioritize God\u2019s reign (Matthew 13:44\u201346; Colossians 3:1\u20132).</li>" +
          "<li>The instruction about tomorrow reflects biblical wisdom about daily dependence on God (Lamentations 3:22\u201323; Proverbs 27:1; James 4:13\u201315).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>What would it look like for you, in practical terms, to \u201cseek first the kingdom of God\u201d in the coming week? Can you name one concrete step?</li>" +
          "<li>If you could take only today\u2019s burdens and leave tomorrow\u2019s for tomorrow, how might your experience of this day change?</li>" +
          "<li>Think of someone you know who lives with a visible sense of peace and trust. What do you observe in the way they handle worry?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, practice \u201ctoday only\u201d trust. Each morning, consciously hand the day to God and ask, \u201cWhat does it look like to seek your kingdom first today?\u201d At the end of the week, notice what shifted in your heart.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "When you picture the birds and the flowers, what do they teach you about the way God provides? What part of that picture is hardest for you to apply to your own life?",
      "Jesus says worry cannot add a single hour to your life. What is one worry you are carrying right now that you know is not actually helping you?",
      "Has there been a time when you looked back and realized God had been providing all along, even though you could not see it in the moment?",
      "What would it look like for you, in practical terms, to \u201cseek first the kingdom of God\u201d in the coming week? Can you name one concrete step?",
      "If you could take only today\u2019s burdens and leave tomorrow\u2019s for tomorrow, how might your experience of this day change?",
      "Think of someone you know who lives with a visible sense of peace and trust. What do you observe in the way they handle worry?",
    ],
  },
  // ==================== LESSON 8 ====================
  {
    id: "28",
    version: 1,
    title: "Build on the Rock",
    subtitle: "Hearing and Doing the Words of Jesus",
    date: "2026-10-24",
    scheduledDate: "2026-10-24",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 7:24-29",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>The Sermon on the Mount ends with one of Jesus\u2019 most memorable parables. He describes two builders: one wise, one foolish. Both hear his words, but only one puts them into practice. A storm tests both houses, and the results are dramatically different.</p>" +
          "<p>In first-century Palestine, builders in the hill country of Galilee would dig down to bedrock to lay a foundation. In the lowlands near wadis (dry riverbeds), a builder might be tempted to build on sandy ground that looks solid during dry months. But when the rainy season arrives, flash floods sweep through those wadis with terrifying force. A house built on sand could be obliterated in minutes.</p>" +
          "<p>In Jewish wisdom literature, the contrast between wise and foolish people is a core theme. Wisdom is not primarily about intelligence. It is about choices. The wise person sees how life really works and acts accordingly. The foolish person knows the right path but chooses the easier one (Proverbs 10:25; 12:7; 14:11). When Jesus tells this parable, his Jewish audience would immediately hear echoes of Proverbs and recognize the seriousness of the choice he is presenting.</p>" +
          "<p>After the parable, Matthew notes that the crowds were \u201castonished at his teaching, because he taught them as one who had authority, and not as their scribes.\u201d Scribes typically taught by citing earlier rabbis and traditions. Jesus taught on his own authority: \u201cEveryone who hears these words of mine.\u201d He placed his own teaching on the same level as the Torah itself, which was a stunning claim that set him apart from every other teacher in Israel.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>24</sup> Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: <sup>25</sup> And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock. <sup>26</sup> And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand: <sup>27</sup> And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it.</p>",
        reference: "Matthew 7:24-27",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus draws a line here, and he does it with a simple story that everyone in the crowd would understand. Two people hear his words. One puts them into practice and is like a builder who digs down to rock and lays a solid foundation. The other hears the same words and does nothing with them, like a builder who takes a shortcut and puts his house on sand.</p>" +
          "<p>Notice that the storm hits both houses. Jesus does not promise that following him means no storms. Rain falls, rivers rise, and wind beats against both the wise and the foolish. The difference is underneath, in the foundation. The storm reveals what was always there.</p>" +
          "<p>I think many of us have heard a lot of teaching over the years. We have sat in services, read books, and listened to podcasts. Jesus is asking a pointed question: What have you done with what you have heard? Has the word gone from your ears into your life, into your decisions, your relationships, your responses under pressure? That is the difference between rock and sand.</p>" +
          "<p>And I want you to notice how total the failure is for the foolish builder. Jesus says, \u201cIt fell, and great was the fall of it.\u201d This is not a slight crack in the wall. It is a catastrophic collapse. Jesus is saying that the stakes of hearing without doing are very high.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>In Palestinian construction, building on rock meant digging through topsoil to reach bedrock, a labor-intensive process that the foolish builder bypasses.</li>" +
          "<li>The storm imagery in Jewish wisdom points to both life\u2019s trials and the final judgment when God\u2019s evaluation reveals what is lasting (Proverbs 10:25; 1 Corinthians 3:11\u201315).</li>" +
          "<li>The parable echoes Ezekiel 13:10\u201316, where false prophets build a flimsy wall that God\u2019s storm destroys.</li>" +
          "<li>James 1:22\u201325 carries the same emphasis on being a doer of the word, not a hearer only.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>If you are honest, which of Jesus\u2019 teachings are you already building on (practicing regularly), and which ones are still sitting in the \u201cheard but not acted on\u201d category?</li>" +
          "<li>Think of a \u201cstorm\u201d you have been through. What held you up? Was there a specific truth or habit that served as bedrock?</li>" +
          "<li>What is one teaching of Jesus that you believe but have not yet put into consistent practice? What would it look like to start this week?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>28</sup> And it came to pass, when Jesus had ended these sayings, the people were astonished at his doctrine: <sup>29</sup> For he taught them as one having authority, and not as the scribes.</p>",
        reference: "Matthew 7:28-29",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Matthew closes the Sermon on the Mount with a note about the crowd\u2019s reaction: \u201cThe crowds were astonished at his teaching, for he was teaching them as one who had authority, and not as their scribes.\u201d</p>" +
          "<p>That word \u201cauthority\u201d is important. The scribes taught by quoting rabbis and traditions. They would say, \u201cRabbi so-and-so taught...\u201d Jesus did not do that. He said, \u201cI say to you.\u201d He spoke as someone with the right to interpret, fulfill, and even deepen the Law. He placed his own words at the center of the choice between wisdom and foolishness.</p>" +
          "<p>This matters because we are not building on the ideas of just another teacher. We are building on the words of the One who has all authority in heaven and on earth (Matthew 28:18). His teaching carries the weight of his identity. When he says, \u201cLove your enemies,\u201d or \u201cDo not worry,\u201d or \u201cSeek first the kingdom,\u201d he speaks as the Lord who has the power to back up everything he asks.</p>" +
          "<p>So as we close the Sermon on the Mount, I want to leave you with this question: Are you building? Not just listening, not just admiring, but actually building your daily life on what Jesus has said?</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The formula \u201cwhen Jesus had finished these sayings\u201d marks the end of each of the five major discourses in Matthew (Matthew 11:1; 13:53; 19:1; 26:1).</li>" +
          "<li>The contrast with the scribes underlines Jesus\u2019 direct, personal authority, which becomes a theme throughout Matthew in his teaching, healing, forgiving of sins, and lordship over nature (Matthew 8\u20139; Matthew 28:18).</li>" +
          "<li>Early Christians understood that building on Jesus\u2019 teaching meant forming communities of practice, not just schools of thought (James 1:22\u201325; Romans 2:13).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>What is it about Jesus\u2019 authority that gives you confidence to build your life on his words, even when the world offers competing foundations?</li>" +
          "<li>Looking back over the Sermon on the Mount (Matthew 5\u20137), which teaching has challenged you the most during this study? What will you do with it?</li>" +
          "<li>If someone who does not follow Jesus watched how you handle the next \u201cstorm\u201d in your life, what would they learn about your foundation?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, pick one specific teaching from the Sermon on the Mount that you want to move from \u201cheard\u201d to \u201cpracticed.\u201d Write it down, share it with someone, and take one concrete step of obedience. Pay attention to what happens.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "If you are honest, which of Jesus\u2019 teachings are you already building on (practicing regularly), and which ones are still sitting in the \u201cheard but not acted on\u201d category?",
      "Think of a \u201cstorm\u201d you have been through. What held you up? Was there a specific truth or habit that served as bedrock?",
      "What is one teaching of Jesus that you believe but have not yet put into consistent practice? What would it look like to start this week?",
      "What is it about Jesus\u2019 authority that gives you confidence to build your life on his words, even when the world offers competing foundations?",
      "Looking back over the Sermon on the Mount (Matthew 5\u20137), which teaching has challenged you the most during this study? What will you do with it?",
      "If someone who does not follow Jesus watched how you handle the next \u201cstorm\u201d in your life, what would they learn about your foundation?",
    ],
  },
  // ==================== LESSON 9 ====================
  {
    id: "29",
    version: 1,
    title: "Jesus Heals a Leper and a Centurion\u2019s Servant",
    subtitle: "No One Is Beyond His Reach",
    date: "2026-10-31",
    scheduledDate: "2026-10-31",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 8:1-13",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Immediately after the Sermon on the Mount, Matthew begins a sequence of miracles that show Jesus putting his words into action. The first two healings are striking because Jesus touches a leper and praises the faith of a Roman soldier, two people who stood on opposite sides of Israel\u2019s social and religious boundaries.</p>" +
          "<p>To appreciate the leper\u2019s situation, we need to understand what \u201cleprosy\u201d meant in first-century Judaism. The Hebrew word <em>tsara\u2019at</em> covered a range of serious skin conditions, not just what we now call Hansen\u2019s disease. According to Leviticus 13\u201314, a person diagnosed with <em>tsara\u2019at</em> was declared ritually unclean, had to wear torn clothing, leave the hair ungroomed, cover the lower face, and cry out \u201cUnclean! Unclean!\u201d to warn anyone nearby. They were required to live \u201coutside the camp.\u201d The laws were not primarily about contagion in the medical sense. They were about ritual purity and the separation between the holy community and what was considered defiled.</p>" +
          "<p>In rabbinic tradition, cleansing a leper was considered as difficult as raising the dead. From the time the Mosaic law was completed, there was no recorded case of a Jewish person being healed of leprosy, yet Leviticus 14 gave detailed instructions for what the priest should do in case it happened. When Jesus healed a Jewish leper, it was an event without precedent and a powerful messianic sign (Isaiah 35:5\u20136; 2 Kings 5:1\u201314).</p>" +
          "<p>The centurion\u2019s story introduces a Roman military officer. Centurions commanded about eighty soldiers and were the backbone of the Roman army. In occupied Galilee, they represented the foreign power that many Jews despised. Yet this centurion approaches Jesus humbly and demonstrates a faith that astonishes Jesus himself. He understands authority: just as he gives orders that are obeyed, he recognizes that Jesus can give a command and sickness must obey. Jesus declares, \u201cWith no one in Israel have I found such faith\u201d (Matthew 8:10) and heals the servant at a distance.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup> When he was come down from the mountain, great multitudes followed him. <sup>2</sup> And, behold, there came a leper and worshipped him, saying, Lord, if thou wilt, thou canst make me clean. <sup>3</sup> And Jesus put forth his hand, and touched him, saying, I will; be thou clean. And immediately his leprosy was cleansed. <sup>4</sup> And Jesus saith unto him, See thou tell no man; but go thy way, shew thyself to the priest, and offer the gift that Moses commanded, for a testimony unto them.</p>",
        reference: "Matthew 8:1-4",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>As Jesus comes down from the mountain, a man with leprosy approaches, kneels before him, and says, \u201cLord, if you are willing, you can make me clean.\u201d Notice the man\u2019s posture. He is reverent, humble, and full of faith. He does not question Jesus\u2019 power. He only wonders about his willingness.</p>" +
          "<p>Jesus\u2019 response is remarkable. He reaches out his hand and touches the man. In the normal order of things, touching a leper made you ceremonially unclean (Leviticus 5:3). But Jesus is not normal. When he touches the unclean, the uncleanness does not flow to him. Instead, his cleanness flows to the leper. He says, \u201cI am willing; be clean.\u201d And immediately the leprosy is gone.</p>" +
          "<p>I want you to sit with that for a moment. Whatever you carry that makes you feel disqualified, contaminated, or shut out, Jesus says, \u201cI am willing.\u201d He is not afraid of our mess. He reaches toward it and brings healing.</p>" +
          "<p>Then Jesus tells the man to show himself to the priest and make the offering Moses commanded. He is not abolishing the law. He is fulfilling it and giving the religious leaders a chance to see evidence that the Messiah has arrived.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The leper\u2019s request uses the Greek word <em>katharisai</em> (\u201cmake clean\u201d), not simply \u201cheal,\u201d which highlights the ritual and social dimensions of his condition, not just the physical symptoms.</li>" +
          "<li>Jesus\u2019 instruction to \u201ctell no one\u201d but to go to the priest is sometimes called the \u201cmessianic secret.\u201d Jesus controls the pace of his public reputation to avoid premature confrontation and to follow the Father\u2019s timing (Matthew 8:4; Mark 1:43\u201344).</li>" +
          "<li>The Levitical procedure for a cleansed leper involved a complex ceremony with two birds, cedarwood, scarlet yarn, and hyssop, followed by sacrifices at the temple over eight days (Leviticus 14:1\u201332).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The leper said, \u201cIf you are willing.\u201d Have you ever wondered whether God was willing to help you with a specific need? What happened when you brought it to him?</li>" +
          "<li>Jesus reached out and touched someone the rest of society avoided. Who are the \u201cuntouchables\u201d in our world today, and what might it look like for us to move toward them instead of away?</li>" +
          "<li>How does the fact that Jesus\u2019 cleanness overpowers uncleanness, rather than the other way around, change the way you think about bringing your worst struggles to him?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>5</sup> And when Jesus was entered into Capernaum, there came unto him a centurion, beseeching him, <sup>6</sup> And saying, Lord, my servant lieth at home sick of the palsy, grievously tormented. <sup>7</sup> And Jesus saith unto him, I will come and heal him. <sup>8</sup> The centurion answered and said, Lord, I am not worthy that thou shouldest come under my roof: but speak the word only, and my servant shall be healed. <sup>9</sup> For I am a man under authority, having soldiers under me: and I say to this man, Go, and he goeth; and to another, Come, and he cometh; and to my servant, Do this, and he doeth it. <sup>10</sup> When Jesus heard it, he marvelled, and said to them that followed, Verily I say unto you, I have not found so great faith, no, not in Israel. <sup>11</sup> And I say unto you, That many shall come from the east and west, and shall sit down with Abraham, and Isaac, and Jacob, in the kingdom of heaven. <sup>12</sup> But the children of the kingdom shall be cast out into outer darkness: there shall be weeping and gnashing of teeth. <sup>13</sup> And Jesus said unto the centurion, Go thy way; and as thou hast believed, so be it done unto thee. And his servant was healed in the selfsame hour.</p>",
        reference: "Matthew 8:5-13",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Now a centurion comes to Jesus in Capernaum. He says, \u201cLord, my servant is lying paralyzed at home, suffering terribly.\u201d Jesus offers to come to his house, but the centurion says something extraordinary: \u201cLord, I am not worthy to have you come under my roof, but only say the word, and my servant will be healed.\u201d</p>" +
          "<p>Then he explains his reasoning. \u201cI too am a man under authority, with soldiers under me. I tell this one, \u2018Go,\u2019 and he goes; and another, \u2018Come,\u2019 and he comes.\u201d He understands chains of command. He sees that Jesus has authority over sickness the way a commander has authority over troops. If Jesus simply gives the order, disease must obey.</p>" +
          "<p>When Jesus hears this, Matthew says he \u201cmarveled.\u201d Think about that. The Son of God is amazed. He turns to the crowd and says, \u201cTruly, I tell you, with no one in Israel have I found such faith.\u201d</p>" +
          "<p>This is humbling and encouraging at the same time. A pagan soldier understands something about Jesus that the religious insiders have missed. Faith is not about having the right background. It is about recognizing who Jesus is and trusting his word. You do not need to be in the right place, have the right credentials, or even be in the same room. If Jesus speaks, it is done.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Centurions appear repeatedly in the New Testament and are consistently portrayed positively: this centurion, Cornelius (Acts 10), and the centurion at the cross (Matthew 27:54).</li>" +
          "<li>Jesus\u2019 declaration that \u201cmany will come from east and west and recline at table with Abraham, Isaac, and Jacob\u201d (Matthew 8:11) anticipates the inclusion of Gentiles in God\u2019s kingdom, a major theme in Matthew.</li>" +
          "<li>The servant\u2019s healing happens \u201cin that hour\u201d at a distance, demonstrating that Jesus\u2019 authority is not limited by physical proximity (Matthew 8:13; cf. John 4:46\u201354).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The centurion said, \u201cJust say the word.\u201d Where in your life do you need to trust that Jesus\u2019 word alone is enough, even when you cannot see the result yet?</li>" +
          "<li>Jesus was astonished by faith from an unexpected person. Has someone\u2019s faith ever surprised you? What did you learn from them?</li>" +
          "<li>The centurion came to Jesus on behalf of a suffering servant. Who is someone you are carrying to Jesus in prayer right now, and how does this story encourage your persistence?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, bring one \u201cimpossible\u201d need to Jesus in prayer, saying with the leper, \u201cLord, if you are willing,\u201d and with the centurion, \u201cJust say the word.\u201d Pay attention to how God responds, whether through change in the situation or change in your heart.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The leper said, \u201cIf you are willing.\u201d Have you ever wondered whether God was willing to help you with a specific need? What happened when you brought it to him?",
      "Jesus reached out and touched someone the rest of society avoided. Who are the \u201cuntouchables\u201d in our world today, and what might it look like for us to move toward them instead of away?",
      "How does the fact that Jesus\u2019 cleanness overpowers uncleanness, rather than the other way around, change the way you think about bringing your worst struggles to him?",
      "The centurion said, \u201cJust say the word.\u201d Where in your life do you need to trust that Jesus\u2019 word alone is enough, even when you cannot see the result yet?",
      "Jesus was astonished by faith from an unexpected person. Has someone\u2019s faith ever surprised you? What did you learn from them?",
      "The centurion came to Jesus on behalf of a suffering servant. Who is someone you are carrying to Jesus in prayer right now, and how does this story encourage your persistence?",
    ],
  },
  // ==================== LESSON 10 ====================
  {
    id: "30",
    version: 1,
    title: "Jesus Calms the Storm",
    subtitle: "Who Is This Man?",
    date: "2026-11-07",
    scheduledDate: "2026-11-07",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 8:23-27",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>After a day of teaching and healing, Jesus tells his disciples to cross to the other side of the Sea of Galilee. He gets into the boat, falls asleep, and a violent storm erupts.</p>" +
          "<p>The Sea of Galilee is not technically a sea. It is a freshwater lake about thirteen miles long and eight miles wide, sitting roughly 680 feet below sea level in the northern end of the Great Rift Valley. It is surrounded by hills and mountains, with the Golan Heights rising over 2,000 feet on the eastern side. Cool, dry air masses descend rapidly from these surrounding heights and collide with the warm, moist air sitting over the low-lying lake. The result is sudden, violent storms that can develop with virtually no warning, even catching experienced fishermen off guard. The winds funnel through the surrounding gorges and canyons directly onto the water, turning the lake into a churning cauldron in minutes.</p>" +
          "<p>Several of the disciples, including Peter, Andrew, James, and John, were professional fishermen who had worked this lake their entire lives. They knew its moods. The fact that they were terrified tells us this was no ordinary squall.</p>" +
          "<p>In the Old Testament, the sea is often a symbol of chaos and danger. Only God has power over the deep (Psalm 107:23\u201330; Job 38:8\u201311; Psalm 89:9). When Jesus rebukes the wind and waves and they obey him, he is doing what only the God of Israel does. The disciples\u2019 stunned question, \u201cWhat sort of man is this, that even winds and sea obey him?\u201d points directly to his divine identity.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>23</sup> And when he was entered into a ship, his disciples followed him. <sup>24</sup> And, behold, there arose a great tempest in the sea, insomuch that the ship was covered with the waves: but he was asleep. <sup>25</sup> And his disciples came to him, and awoke him, saying, Lord, save us: we perish.</p>",
        reference: "Matthew 8:23-25",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Notice how the story begins. Jesus gives the command to cross to the other side, and the disciples follow him into the boat. They are exactly where he told them to be. And that is when the storm hits.</p>" +
          "<p>I think that matters. We sometimes assume that if we are obeying God, the path should be smooth. This passage says otherwise. The disciples are right in the center of God\u2019s will, and the waves are crashing over the sides of the boat.</p>" +
          "<p>Matthew uses a word for the storm that is related to the Greek word for \u201cearthquake.\u201d This was not a drizzle. The boat was being swamped. Meanwhile, Jesus is asleep in the stern. That detail is astonishing. The disciples are bailing water and screaming, and Jesus is resting. His peace is not dependent on the weather.</p>" +
          "<p>The disciples cry out, \u201cSave us, Lord; we are perishing!\u201d That is a raw, honest prayer. There is no polish on it. And I want you to know that God welcomes prayers that sound like that. You do not need to compose yourself before you call out to him.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Matthew places the storm crossing right after Jesus\u2019 teaching on the cost of discipleship (Matthew 8:18\u201322), connecting the physical storm to the spiritual trials of following him.</li>" +
          "<li>Jesus\u2019 sleep in the storm echoes Jonah sleeping during a storm at sea (Jonah 1:5\u20136), but with a crucial difference: Jonah was running from God, while Jesus rests in perfect trust of the Father.</li>" +
          "<li>The disciples\u2019 cry \u201cSave us!\u201d uses the verb <em>s\u014dz\u014d</em>, which can mean both physical rescue and spiritual salvation, linking their plea to humanity\u2019s deeper need.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Has there been a time when you were doing what you believed God wanted and a storm hit anyway? How did that affect your faith?</li>" +
          "<li>Jesus slept through the storm because he trusted his Father completely. What would that kind of rest look like in your life, even in the middle of difficulty?</li>" +
          "<li>The disciples prayed an honest, desperate prayer. What holds us back from that kind of raw honesty with God?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>26</sup> And he saith unto them, Why are ye fearful, O ye of little faith? Then he arose, and rebuked the winds and the sea; and there was a great calm. <sup>27</sup> But the men marvelled, saying, What manner of man is this, that even the winds and the sea obey him!</p>",
        reference: "Matthew 8:26-27",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus wakes up, and the first thing he does is address the disciples: \u201cWhy are you afraid, O you of little faith?\u201d Then he gets up, rebukes the winds and the sea, and there is a great calm.</p>" +
          "<p>Two things happen here. First, Jesus deals with their fear. He does not say, \u201cYou should not be scared in a storm.\u201d He says, \u201cWhy are you afraid when I am in the boat with you?\u201d The issue is not the size of the storm. It is the presence of Jesus. If the one who made the sea is sleeping three feet away from you, the situation is different from what it looks like.</p>" +
          "<p>Second, Jesus speaks to the winds and waves, and they stop. Not gradually, not after a while. Immediately. A great calm. In the Old Testament, stilling the sea is something only God does. Psalm 107:29 says, \u201cHe made the storm be still, and the waves of the sea were hushed.\u201d The disciples are watching God work in person.</p>" +
          "<p>Their question at the end is the right question: \u201cWhat sort of man is this?\u201d That question echoes through the rest of Matthew\u2019s Gospel. And it is the question we all need to settle. Is Jesus just a good teacher, or is he the Lord who commands creation? The answer to that question changes everything about how we face storms.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>In Jewish thought, the sea represented chaos, danger, and forces hostile to God. God\u2019s mastery over the sea was a sign of his supreme sovereignty (Genesis 1:2, 6\u201310; Psalm 74:13; Psalm 89:9\u201310; Job 38:8\u201311).</li>" +
          "<li>The \u201cgreat calm\u201d (<em>gal\u0113n\u0113 megal\u0113</em>) parallels the \u201cgreat storm\u201d (<em>seismos megas</em>), showing that Jesus\u2019 power is proportional to the threat.</li>" +
          "<li>This miracle foreshadows the later scene where Jesus walks on the same sea (Matthew 14:22\u201333), further revealing his divine identity.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus asked, \u201cWhy are you afraid?\u201d If he asked you that question today about a specific situation, what would your honest answer be?</li>" +
          "<li>What does it mean for your daily life to believe that the one who calms the sea is also present in your struggles?</li>" +
          "<li>\u201cWhat sort of man is this?\u201d How would you answer that question today, and how does your answer shape the way you live?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, when anxiety or fear rises, practice pausing and remembering: \u201cJesus is in the boat.\u201d How might that awareness change your response to whatever storm you are in?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Has there been a time when you were doing what you believed God wanted and a storm hit anyway? How did that affect your faith?",
      "Jesus slept through the storm because he trusted his Father completely. What would that kind of rest look like in your life, even in the middle of difficulty?",
      "The disciples prayed an honest, desperate prayer. What holds us back from that kind of raw honesty with God?",
      "Jesus asked, \u201cWhy are you afraid?\u201d If he asked you that question today about a specific situation, what would your honest answer be?",
      "What does it mean for your daily life to believe that the one who calms the sea is also present in your struggles?",
      "\u201cWhat sort of man is this?\u201d How would you answer that question today, and how does your answer shape the way you live?",
    ],
  },
  // ==================== LESSON 11 ====================
  {
    id: "31",
    version: 1,
    title: "Your Sins Are Forgiven",
    subtitle: "Jesus Heals a Paralyzed Man",
    date: "2026-11-14",
    scheduledDate: "2026-11-14",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 9:1-8",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Jesus returns to Capernaum, his home base for ministry, and a paralyzed man is brought to him on a stretcher by friends. The parallel accounts in Mark 2 and Luke 5 tell us the house was so packed that the friends dug through the roof and lowered the man down.</p>" +
          "<p>What makes this story explosive is not the healing itself but what Jesus says first: \u201cTake heart, my son; your sins are forgiven.\u201d In first-century Judaism, forgiveness of sins was understood as God\u2019s exclusive prerogative. The established system for dealing with sin involved confession, sacrifice at the temple, and priestly mediation. Only God could ultimately forgive, and the process was channeled through Israel\u2019s sacrificial system (Isaiah 43:25; Leviticus 4\u20135).</p>" +
          "<p>When Jesus pronounced forgiveness directly, without sacrifice and without priestly intermediary, the scribes present immediately accused him of blasphemy. \u201cBlasphemy\u201d was a charge that carried the death penalty under Jewish law (Leviticus 24:16). They were not overreacting by their own categories. If Jesus was merely a man, he was indeed claiming something that belonged to God alone. The whole tension of the scene rests on who Jesus really is.</p>" +
          "<p>Jesus responds by asking which is easier to say: \u201cYour sins are forgiven\u201d or \u201cRise and walk.\u201d Anyone can claim to forgive sins since no one can verify it on the spot. But commanding a paralyzed man to walk is immediately testable. Jesus heals the man \u201cso that you may know that the Son of Man has authority on earth to forgive sins.\u201d The visible miracle proves the invisible reality. Matthew notes that the crowds were \u201cafraid\u201d and glorified God \u201cwho had given such authority to men.\u201d</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup> And he entered into a ship, and passed over, and came into his own city. <sup>2</sup> And, behold, they brought to him a man sick of the palsy, lying on a bed: and Jesus seeing their faith said unto the sick of the palsy; Son, be of good cheer; thy sins be forgiven thee. <sup>3</sup> And, behold, certain of the scribes said within themselves, This man blasphemeth. <sup>4</sup> And Jesus knowing their thoughts said, Wherefore think ye evil in your hearts? <sup>5</sup> For whether is easier, to say, Thy sins be forgiven thee; or to say, Arise, and walk?</p>",
        reference: "Matthew 9:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>When the paralyzed man is lowered in front of Jesus, we might expect Jesus to say, \u201cBe healed.\u201d Instead, his first words are, \u201cTake heart, my son; your sins are forgiven.\u201d</p>" +
          "<p>Why would he start there? Because Jesus sees the whole person. The man\u2019s paralysis is real and painful, but Jesus knows there is a deeper problem that a working body cannot fix. Every one of us carries the weight of sin: things we have done, things we have failed to do, guilt that we cannot shake. Jesus goes to the root.</p>" +
          "<p>The scribes in the room immediately think, \u201cThis man is blaspheming.\u201d And honestly, their logic makes sense if Jesus is just a man. Only God can forgive sins. But Jesus knows their thoughts and asks a probing question: \u201cWhich is easier, to say, \u2018Your sins are forgiven,\u2019 or to say, \u2018Get up and walk\u2019?\u201d</p>" +
          "<p>Think about that. Saying \u201cyour sins are forgiven\u201d is easy in one sense because no one can prove it happened or did not happen. But saying \u201cget up and walk\u201d to a paralyzed man puts your authority on public display. Jesus is about to do the harder thing to prove the authority behind the easier thing.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cSon of Man\u201d is Jesus\u2019 preferred title for himself. It echoes Daniel 7:13\u201314, where the Son of Man receives authority, glory, and an everlasting kingdom from God.</li>" +
          "<li>The scribes\u2019 accusation of blasphemy appears three times in Matthew (9:3; 26:65; implied in 12:24), escalating toward the final trial.</li>" +
          "<li>The connection between sin and sickness was a common first-century assumption (John 9:2), but Jesus does not confirm that this man\u2019s paralysis was caused by personal sin. He simply addresses the deeper need.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus addressed the man\u2019s sin before his paralysis. If Jesus could speak to the deepest need in your life right now, what do you think he would address first?</li>" +
          "<li>The scribes were offended by Jesus\u2019 claim. Why do you think the idea of Jesus having authority to forgive is still challenging or even offensive to some people today?</li>" +
          "<li>When you think about the words \u201cTake heart, my son; your sins are forgiven,\u201d what emotions come up for you personally?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>6</sup> But that ye may know that the Son of man hath power on earth to forgive sins, (then saith he to the sick of the palsy,) Arise, take up thy bed, and go unto thine house. <sup>7</sup> And he arose, and departed to his house. <sup>8</sup> But when the multitudes saw it, they marvelled, and glorified God, which had given such power unto men.</p>",
        reference: "Matthew 9:6-8",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus turns to the paralyzed man and says, \u201cRise, pick up your bed and go home.\u201d And the man gets up and walks out. The room must have gone silent. What just happened? A man who was carried in is now walking home under his own power.</p>" +
          "<p>But the point is not just the miracle. The point is what the miracle proves. Jesus says he healed the man \u201cso that you may know that the Son of Man has authority on earth to forgive sins.\u201d The healing you can see is the evidence for the forgiveness you cannot see.</p>" +
          "<p>This matters for all of us. We may never witness a dramatic physical healing. But the same Jesus who commanded a paralyzed man to walk also says to you and me, \u201cYour sins are forgiven.\u201d And we can trust that his word carries the same authority whether we see the evidence immediately or not.</p>" +
          "<p>Matthew tells us the crowds were amazed and glorified God. Something had happened in that room that changed the way people understood who God is and what he is doing. When Jesus forgives, it is not wishful thinking. It is a declaration backed by the authority of the Son of God.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The phrase \u201cauthority on earth\u201d distinguishes Jesus\u2019 ministry from the final judgment. He exercises the prerogative of God now, during his earthly life, not only at the end of the age.</li>" +
          "<li>The crowd\u2019s response, \u201cglorified God, who had given such authority to men,\u201d may reflect their amazement that God\u2019s forgiveness is now accessible through a human figure walking among them.</li>" +
          "<li>This event likely intensified the scribes\u2019 opposition and contributed to the growing conflict that runs through Matthew\u2019s Gospel toward the cross.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus used a visible miracle to prove an invisible reality. What \u201cevidence\u201d has God given you in your own life that has strengthened your trust in things you cannot see?</li>" +
          "<li>The man\u2019s friends brought him to Jesus. Who has carried you to Jesus, whether through prayer, encouragement, or simply being present? Have you thanked them?</li>" +
          "<li>If you fully believed that Jesus has the authority to forgive every sin in your past, how would that change the way you live tomorrow?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, if there is guilt, shame, or unfinished business with God that weighs on you, bring it honestly to Jesus. Hear him say, \u201cTake heart; your sins are forgiven.\u201d What would it look like to live as if that is really true?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus addressed the man\u2019s sin before his paralysis. If Jesus could speak to the deepest need in your life right now, what do you think he would address first?",
      "The scribes were offended by Jesus\u2019 claim. Why do you think the idea of Jesus having authority to forgive is still challenging or even offensive to some people today?",
      "When you think about the words \u201cTake heart, my son; your sins are forgiven,\u201d what emotions come up for you personally?",
      "Jesus used a visible miracle to prove an invisible reality. What \u201cevidence\u201d has God given you in your own life that has strengthened your trust in things you cannot see?",
      "The man\u2019s friends brought him to Jesus. Who has carried you to Jesus, whether through prayer, encouragement, or simply being present? Have you thanked them?",
      "If you fully believed that Jesus has the authority to forgive every sin in your past, how would that change the way you live tomorrow?",
    ],
  },
  // ==================== LESSON 12 ====================
  {
    id: "32",
    version: 1,
    title: "The Calling of Matthew: Jesus Eats with Sinners",
    subtitle: "Mercy Over Sacrifice",
    date: "2026-11-21",
    scheduledDate: "2026-11-21",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 9:9-13",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>In the very next scene after the paralytic\u2019s healing, Jesus walks past a tax collection booth and calls a man named Matthew (also known as Levi) to follow him. Matthew gets up and follows immediately. Then Jesus sits down to eat in Matthew\u2019s house with \u201cmany tax collectors and sinners,\u201d which provokes sharp criticism from the Pharisees.</p>" +
          "<p>To understand the scandal, we need to know what tax collectors were in first-century Palestine. The Roman Empire outsourced tax collection to local agents who bid for the right to collect in a given area. These agents, called <em>publicani</em> or \u201cpublicans,\u201d were required to deliver a set amount to Rome and were permitted to keep whatever extra they collected. The system was an open invitation to corruption. Many tax collectors became wealthy by overcharging their own neighbors.</p>" +
          "<p>For a Jew to become a tax collector was doubly offensive. It meant collaborating with the Roman occupation and profiting from the suffering of fellow Jews. Tax collectors were classified alongside robbers and were barred from serving as witnesses or judges in Jewish courts. They were often excommunicated from the synagogue. Matthew\u2019s Gospel calls him \u201cMatthew the tax collector\u201d in the list of the twelve apostles (Matthew 10:3), the only Gospel to use that label, which may be a mark of the author\u2019s own humility, remembering where he came from.</p>" +
          "<p>When Jesus sits at table with these people, the Pharisees are scandalized. In Jewish culture, sharing a meal was a sign of fellowship and acceptance. You did not eat with people you considered outside God\u2019s covenant. Jesus responds with a line from the prophet Hosea: \u201cI desire mercy, not sacrifice\u201d (Hosea 6:6), a verse he will quote again in Matthew 12:7. He then summarizes his mission: \u201cI came not to call the righteous, but sinners.\u201d</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>9</sup> And as Jesus passed forth from thence, he saw a man, named Matthew, sitting at the receipt of custom: and he saith unto him, Follow me. And he arose, and followed him. <sup>10</sup> And it came to pass, as Jesus sat at meat in the house, behold, many publicans and sinners came and sat down with him and his disciples.</p>",
        reference: "Matthew 9:9-10",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Picture the scene. Jesus is walking along, probably through Capernaum, and he sees a man named Matthew sitting at the tax booth. He looks at him and says two words: \u201cFollow me.\u201d</p>" +
          "<p>That is it. No long interview, no probation period, no requirement to clean up first. Just \u201cFollow me.\u201d And Matthew gets up and walks away from his entire livelihood. Tax collectors could not easily come back to their position once they left. This was a one-way door.</p>" +
          "<p>Then Matthew opens his house for a meal and invites his friends, who are other tax collectors and people labeled \u201csinners.\u201d This is the world Matthew knows. And instead of telling him to cut ties with everyone from his old life, Jesus sits down and eats with them.</p>" +
          "<p>I want you to notice two things. First, Jesus initiates. He does not wait for Matthew to come to him. He walks to the booth and speaks first. Second, Jesus enters Matthew\u2019s world before asking Matthew to enter his. He meets people where they are. That is still how he works. He does not stand at a distance and wait for us to become acceptable. He comes to us.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Mark and Luke call this disciple \u201cLevi, son of Alphaeus\u201d (Mark 2:14; Luke 5:27). \u201cMatthew\u201d (meaning \u201cgift of God\u201d or \u201cYahweh\u2019s gift\u201d) may be a name he received after following Jesus, similar to Simon receiving the name Peter.</li>" +
          "<li>Tax booths were typically located at major trade routes or border crossings. Capernaum sat on the Via Maris trade route, making it a prime location for customs collection.</li>" +
          "<li>Matthew\u2019s immediate response echoes the pattern of earlier disciples who left their nets immediately when Jesus called (Matthew 4:18\u201322).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus called Matthew right in the middle of his mess, not after he had cleaned up. How does that challenge or comfort you when you think about your own story with God?</li>" +
          "<li>Matthew responded immediately, even though it cost him his career. What has following Jesus cost you, and what has it given you in return?</li>" +
          "<li>Jesus entered Matthew\u2019s house and ate with his friends. How can we follow that example in our own relationships with people who feel far from God?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>11</sup> And when the Pharisees saw it, they said unto his disciples, Why eateth your Master with publicans and sinners? <sup>12</sup> But when Jesus heard that, he said unto them, They that be whole need not a physician, but they that are sick. <sup>13</sup> But go ye and learn what that meaneth, I will have mercy, and not sacrifice: for I am not come to call the righteous, but sinners to repentance.</p>",
        reference: "Matthew 9:11-13",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>The Pharisees see Jesus at the table with tax collectors and sinners, and they go to his disciples with a pointed question: \u201cWhy does your teacher eat with tax collectors and sinners?\u201d In their framework, a holy man should keep his distance from impure people. Eating with them meant accepting them.</p>" +
          "<p>Jesus overhears and answers directly: \u201cThose who are well have no need of a physician, but those who are sick.\u201d That is a simple, devastating analogy. A doctor does not stay in the waiting room with healthy people. A doctor goes where the sickness is. If Jesus is the Great Physician, then the tax collector\u2019s table is exactly where he should be.</p>" +
          "<p>Then he adds something sharp: \u201cGo and learn what this means: \u2018I desire mercy, not sacrifice.\u2019\u201d He is quoting Hosea 6:6, a verse the Pharisees would have known. God is not primarily impressed by religious rituals. He is looking for hearts that extend mercy to broken people. The Pharisees had the sacrifices down. What they were missing was mercy.</p>" +
          "<p>And then the summary statement that defines his whole mission: \u201cI came not to call the righteous, but sinners.\u201d If you think you have it all together, you may not see your need for Jesus. But if you know you are broken, if you know you need help, then his invitation is aimed directly at you.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Hosea 6:6 is quoted twice by Jesus in Matthew (9:13; 12:7), making it a key interpretive lens for understanding his ministry. God desires covenant loyalty and compassion (<em>hesed</em>), not mere outward compliance.</li>" +
          "<li>The Pharisees\u2019 concern was rooted in purity laws that associated table fellowship with religious solidarity. Jesus redefines fellowship around mercy rather than ritual boundaries.</li>" +
          "<li>\u201cI came not to call the righteous, but sinners\u201d does not mean some people do not need God. It means that self-righteous people often do not recognize their need (Luke 18:9\u201314).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus said he came as a physician for the sick. In what area of your life do you most need his healing right now?</li>" +
          "<li>\u201cI desire mercy, not sacrifice.\u201d Where might God be asking you to show mercy to someone rather than standing on principle or keeping your distance?</li>" +
          "<li>Do you tend to see yourself more as the Pharisee in this story or more as the tax collector? What does that tell you about where you are with God?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, think of one person in your life who might feel like an \u201coutsider,\u201d whether from church, from your circle, or from God. What is one specific, practical act of mercy you can extend to them, following Jesus\u2019 example of moving toward people rather than away?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus called Matthew right in the middle of his mess, not after he had cleaned up. How does that challenge or comfort you when you think about your own story with God?",
      "Matthew responded immediately, even though it cost him his career. What has following Jesus cost you, and what has it given you in return?",
      "Jesus entered Matthew\u2019s house and ate with his friends. How can we follow that example in our own relationships with people who feel far from God?",
      "Jesus said he came as a physician for the sick. In what area of your life do you most need his healing right now?",
      "\u201cI desire mercy, not sacrifice.\u201d Where might God be asking you to show mercy to someone rather than standing on principle or keeping your distance?",
      "Do you tend to see yourself more as the Pharisee in this story or more as the tax collector? What does that tell you about where you are with God?",
    ],
  },
  // ==================== LESSON 13 ====================
  {
    id: "33",
    version: 1,
    title: "Jesus Sends Out the Twelve",
    subtitle: "Sharing the Good News",
    date: "2026-11-28",
    scheduledDate: "2026-11-28",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 10:1-15",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>By Matthew 10, Jesus\u2019 ministry has grown beyond what one person can cover. He has been traveling through Galilee\u2019s villages and towns, teaching in synagogues, proclaiming the kingdom, and healing every kind of disease (Matthew 9:35). Now he commissions the twelve disciples to extend that work.</p>" +
          "<p>The number twelve is loaded with significance. Israel was made up of twelve tribes descended from the twelve sons of Jacob. By choosing exactly twelve apostles, Jesus is symbolically reconstituting Israel around himself and signaling the restoration that the prophets had promised. These twelve are not religious professionals. They include fishermen, a tax collector, a political zealot, and others from ordinary walks of life. Jesus gave them authority over unclean spirits and the power to heal, equipping them for the work he was sending them to do (Matthew 10:1).</p>" +
          "<p>Jesus restricts this initial mission: \u201cGo nowhere among the Gentiles, and enter no town of the Samaritans. Go rather to the lost sheep of the house of Israel\u201d (Matthew 10:5\u20136). This instruction was not a permanent exclusion of non-Jews. It reflected a divine priority. The prophets spoke of God as a shepherd who would seek his lost sheep (Jeremiah 50:6; Ezekiel 34:11\u201316). Israel had to hear the message first so that, through them, the good news could flow outward to all nations, as it would after the resurrection (Matthew 28:19).</p>" +
          "<p>The instructions Jesus gives are remarkably sparse: no extra money, no bag, no spare clothing. The apostles were to depend entirely on God\u2019s provision through the hospitality of those who received them. This mirrored the dependence of Israel in the wilderness and underscored the urgency of the message: the kingdom of heaven has drawn near, and this is no time for excess baggage.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup> And when he had called unto him his twelve disciples, he gave them power against unclean spirits, to cast them out, and to heal all manner of sickness and all manner of disease. <sup>2</sup> Now the names of the twelve apostles are these; The first, Simon, who is called Peter, and Andrew his brother; James the son of Zebedee, and John his brother; <sup>3</sup> Philip, and Bartholomew; Thomas, and Matthew the publican; James the son of Alphaeus, and Lebbaeus, whose surname was Thaddaeus; <sup>4</sup> Simon the Canaanite, and Judas Iscariot, who also betrayed him. <sup>5</sup> These twelve Jesus sent forth, and commanded them, saying, Go not into the way of the Gentiles, and into any city of the Samaritans enter ye not: <sup>6</sup> But go rather to the lost sheep of the house of Israel. <sup>7</sup> And as ye go, preach, saying, The kingdom of heaven is at hand. <sup>8</sup> Heal the sick, cleanse the lepers, raise the dead, cast out devils: freely ye have received, freely give.</p>",
        reference: "Matthew 10:1-8",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>I want you to notice something about this list of twelve names. It is a wildly diverse group. You have Peter, a blunt-spoken fisherman. Matthew, a former tax collector who collaborated with Rome. Simon the Zealot, who likely hated Rome. These men would not naturally sit at the same table. But Jesus calls them all, gives them his authority, and sends them out together.</p>" +
          "<p>Their assignment is straightforward: \u201cAs you go, proclaim this message: \u2018The kingdom of heaven has come near.\u2019 Heal the sick, raise the dead, cleanse those who have leprosy, drive out demons. Freely you have received; freely give.\u201d</p>" +
          "<p>That last line is important. \u201cFreely you have received; freely give.\u201d Everything they have came from Jesus. They did not earn it. So they are to pass it on without charging for it or holding it back. That principle still applies to us. Whatever gifts, knowledge, love, or grace God has given us, they are not ours to hoard. They are meant to flow through us to others.</p>" +
          "<p>And notice that the message is not words only. It comes with action: healing, deliverance, compassion. The kingdom of God is not just an idea to discuss. It shows up in how people are treated. When we serve someone who is hurting, we are announcing the kingdom just as surely as when we speak about it.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cApostle\u201d (<em>apostolos</em>) means \u201cone who is sent,\u201d a term used for authorized representatives who carry the sender\u2019s authority (Matthew 10:2; Luke 6:13).</li>" +
          "<li>The twelve mirror the twelve tribal leaders of Israel (Numbers 1:4\u201316), pointing to Jesus\u2019 role as the one who reconstitutes God\u2019s people.</li>" +
          "<li>\u201cThe lost sheep of the house of Israel\u201d draws from Jeremiah 50:6 and Ezekiel 34:1\u201316, where Israel\u2019s leaders have failed as shepherds and God himself promises to seek the flock.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus chose a very unlikely group of people. What does that tell you about the kind of person God can use, and how does that speak into any sense of inadequacy you may feel?</li>" +
          "<li>\u201cFreely you have received; freely give.\u201d What is one gift, ability, or experience God has given you that you could share more freely with others?</li>" +
          "<li>The disciples announced the kingdom both in words and in actions. Which of those two comes more naturally to you, and how could you grow in the other?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>9</sup> Provide neither gold, nor silver, nor brass in your purses, <sup>10</sup> Nor scrip for your journey, neither two coats, neither shoes, nor yet staves: for the workman is worthy of his meat. <sup>11</sup> And into whatsoever city or town ye shall enter, enquire who in it is worthy; and there abide till ye go thence. <sup>12</sup> And when ye come into an house, salute it. <sup>13</sup> And if the house be worthy, let your peace come upon it: but if it be not worthy, let your peace return to you. <sup>14</sup> And whosoever shall not receive you, nor hear your words, when ye depart out of that house or city, shake off the dust of your feet. <sup>15</sup> Verily I say unto you, It shall be more tolerable for the land of Sodom and Gomorrha in the day of judgment, than for that city.</p>",
        reference: "Matthew 10:9-15",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus tells the twelve to take no gold, no silver, no bag, no extra shirt, no sandals, and no staff. That is a radical stripping down. He wants them to depend entirely on God working through the hospitality of others. Why?</p>" +
          "<p>I think there are at least two reasons. First, urgency. The kingdom is at hand and there is no time to over-prepare. Second, trust. When you have nothing to fall back on, you learn very quickly whether you believe God will provide. The disciples are about to find out what they really believe.</p>" +
          "<p>Jesus also prepares them for rejection. Not everyone will welcome them. When a town refuses to listen, they are to shake the dust off their feet and move on. That is not a gesture of anger. It is a way of saying, \u201cThe responsibility now rests with you. We offered the message. What you do with it is between you and God.\u201d</p>" +
          "<p>This principle is freeing for us too. When we share our faith, when we show kindness, when we speak a word of truth, we are not responsible for how people respond. We are responsible to be faithful, to deliver the message and live it out. The results belong to God.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Traveling without provisions was unusual and counter-cultural. Cynic philosophers also traveled light, but Jesus\u2019 reasoning was different: dependence on God, not philosophical detachment.</li>" +
          "<li>Shaking dust off one\u2019s feet was a Jewish gesture performed when leaving Gentile territory, symbolizing separation from defilement. By applying it to Jewish towns that reject the message, Jesus implies a solemn warning (Acts 13:51).</li>" +
          "<li>The reference to Sodom and Gomorrah (Matthew 10:15) highlights the seriousness of rejecting the kingdom message when it is presented with clear evidence.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus told the disciples to travel with almost nothing. What might God be asking you to let go of so you can depend more fully on him?</li>" +
          "<li>Have you ever shared your faith or offered help and been rejected? How did you handle it, and what did you learn?</li>" +
          "<li>What does it look like practically to \u201cshake the dust off your feet\u201d and move forward without bitterness when someone is not receptive?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, think of one person God has placed in your path. How will you both speak and show the good news of the kingdom to them, trusting God with the outcome?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus chose a very unlikely group of people. What does that tell you about the kind of person God can use, and how does that speak into any sense of inadequacy you may feel?",
      "\u201cFreely you have received; freely give.\u201d What is one gift, ability, or experience God has given you that you could share more freely with others?",
      "The disciples announced the kingdom both in words and in actions. Which of those two comes more naturally to you, and how could you grow in the other?",
      "Jesus told the disciples to travel with almost nothing. What might God be asking you to let go of so you can depend more fully on him?",
      "Have you ever shared your faith or offered help and been rejected? How did you handle it, and what did you learn?",
      "What does it look like practically to \u201cshake the dust off your feet\u201d and move forward without bitterness when someone is not receptive?",
    ],
  },
  // ==================== LESSON 14 ====================
  {
    id: "34",
    version: 1,
    title: "Come to Me: Rest for the Weary",
    subtitle: "The Gentle Yoke of Jesus",
    date: "2026-12-05",
    scheduledDate: "2026-12-05",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 11:28-30",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Matthew 11 records a critical turning point in Jesus\u2019 public ministry. John the Baptist is in prison and sends messengers asking whether Jesus is truly \u201cthe one who is to come\u201d (Matthew 11:2\u20133). The cities of Chorazin, Bethsaida, and Capernaum, where Jesus performed many miracles, have refused to repent (Matthew 11:20\u201324). Opposition from the religious elite is hardening.</p>" +
          "<p>Right in the middle of this mounting rejection, Jesus offers one of the most tender invitations in all of Scripture: \u201cCome to me, all who labor and are heavy laden, and I will give you rest\u201d (Matthew 11:28).</p>" +
          "<p>To understand the weight of these words, we need to know what first-century Galilean life felt like. Economically, Roman taxation consumed an estimated 30\u201340% of a peasant family\u2019s produce, and forced labor conscription was an ever-present threat. Religiously, the Pharisaic oral traditions, later codified in the Mishnah, had multiplied Sabbath regulations, purity rules, and tithing requirements into an overwhelming system. Rabbinic literature speaks of \u201cthe yoke of the Torah\u201d (<em>Pirkei Avot</em> 3:5), and Jesus himself will later describe the Pharisees as people who \u201ctie up heavy burdens, hard to bear, and lay them on people\u2019s shoulders\u201d (Matthew 23:4).</p>" +
          "<p>Against that backdrop, Jesus\u2019 vocabulary is saturated with Old Testament echoes. \u201cRest\u201d (<em>anapausis</em>) recalls God\u2019s promise to Moses, \u201cMy presence will go with you, and I will give you rest\u201d (Exodus 33:14), Joshua\u2019s conquest rest (Joshua 21:44), and especially Jeremiah 6:16: \u201cStand at the crossroads and look... ask for the ancient paths... and you will find rest for your souls,\u201d the very phrase Jesus quotes in Matthew 11:29. \u201cYoke\u201d in rabbinic usage referred to a teacher\u2019s interpretation of the Law that disciples accepted as a framework for life. When Jesus says, \u201cTake my yoke upon you and learn from me,\u201d he is inviting people to exchange the crushing yoke of human religious performance for his own interpretation, one guided by gentleness, humility, and mercy.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>28</sup> Come unto me, all ye that labour and are heavy laden, and I will give you rest.</p>",
        reference: "Matthew 11:28",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>I want you to hear the breadth of this invitation. Jesus says \u201call.\u201d All who labor. All who are heavy laden. There is no qualifying exam. There is no fine print. If you are tired, if you feel crushed under the weight of life, this invitation has your name on it.</p>" +
          "<p>The word \u201clabor\u201d here means to toil to the point of exhaustion. The word \u201cheavy laden\u201d means to be loaded down with a burden too heavy to carry. Some of us carry the weight of grief. Some carry guilt. Some carry responsibility for others. Some carry the exhaustion of trying to be good enough for God. Jesus sees all of it.</p>" +
          "<p>And his promise is not \u201cI will give you a system\u201d or \u201cI will give you more rules.\u201d He says, \u201cI will give you rest.\u201d The rest he offers is not a vacation. It is a relationship. It is the relief that comes when you stop carrying life alone and let someone stronger carry it with you.</p>" +
          "<p>Coming to Jesus can be as simple as an honest prayer: \u201cLord, I am tired. I cannot carry this anymore. I am coming to you.\u201d He does not ask us to clean up first or to try harder. He asks us to come.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The invitation \u201ccome to me\u201d echoes personified Wisdom calling out in Proverbs 8\u20139 and Sirach 24:19; 51:23\u201327. Matthew presents Jesus as Wisdom incarnate who offers what Lady Wisdom promised.</li>" +
          "<li>\u201cI will give you rest\u201d stands in contrast to the religious leaders who load people with burdens but \u201cwill not move them with their finger\u201d (Matthew 23:4).</li>" +
          "<li>The phrase appears immediately after Jesus\u2019 prayer of thanksgiving to the Father (Matthew 11:25\u201327), linking the invitation to intimate knowledge of God shared through the Son.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>When you hear Jesus say \u201cCome to me, all who labor and are heavy laden,\u201d what specific burden comes to mind first? What would it feel like to hand it to him?</li>" +
          "<li>Some of us are exhausted from trying to earn God\u2019s approval. How is Jesus\u2019 invitation different from what you may have heard about religion?</li>" +
          "<li>What tends to keep you from \u201ccoming\u201d to Jesus honestly, whether it is pride, busyness, doubt, or something else?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>29</sup> Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. <sup>30</sup> For my yoke is easy, and my burden is light.</p>",
        reference: "Matthew 11:29-30",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus continues, \u201cTake my yoke upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls. For my yoke is easy, and my burden is light.\u201d</p>" +
          "<p>A yoke was a wooden frame that linked two animals together so they could pull a load side by side. In rabbinic language, accepting a teacher\u2019s \u201cyoke\u201d meant committing to his way of understanding and living out the Torah. So when Jesus says, \u201cTake my yoke,\u201d he is saying, \u201cLink your life to mine. Learn my way of reading God\u2019s Word. Walk with me.\u201d</p>" +
          "<p>He describes himself as \u201cgentle and lowly in heart.\u201d That is remarkable. The religious leaders of his day were often known for their strictness, their debates, and their authority. Jesus says, \u201cI am not like that. I am gentle. I am humble.\u201d He is not harsh with weakness. He does not crush people who are already breaking.</p>" +
          "<p>His yoke is \u201ceasy\u201d and his burden is \u201clight.\u201d That does not mean following Jesus involves no effort or cost. It means that compared with the crushing weight of self-salvation, religious performance, or trying to control everything in our own strength, life with Jesus is breathable. He carries the heavy end. And as we walk with him, we find something the Pharisees\u2019 system could never deliver: rest for our souls.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cRest for your souls\u201d quotes Jeremiah 6:16 almost verbatim, where God invites Israel to return to the \u201cancient paths\u201d of covenant faithfulness.</li>" +
          "<li>\u201cEasy\u201d (<em>chr\u0113stos</em>) can also mean \u201cwell-fitting\u201d or \u201ckind,\u201d like a yoke custom-made for the animal wearing it.</li>" +
          "<li>The contrast is not between Jesus\u2019 yoke and obedience to God\u2019s Law (which Jesus affirms in Matthew 5:17\u201319), but between Jesus\u2019 gracious interpretation and the Pharisees\u2019 legalistic additions that burdened rather than blessed.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>If a \u201cyoke\u201d means linking your life to Jesus and learning from him, what is one area of your life where you would like to learn his way of doing things instead of relying on your own?</li>" +
          "<li>Jesus calls himself \u201cgentle and lowly in heart.\u201d How does that compare with the picture of God you grew up with? How does it change the way you approach him?</li>" +
          "<li>What does \u201crest for your souls\u201d mean to you practically? What would it look like in your life this week?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, when you feel the weight of worry, guilt, or exhaustion, practice saying, \u201cJesus, I am taking your yoke. Teach me. Carry this with me.\u201d Notice what shifts in your heart when you exchange your burden for his.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "When you hear Jesus say \u201cCome to me, all who labor and are heavy laden,\u201d what specific burden comes to mind first? What would it feel like to hand it to him?",
      "Some of us are exhausted from trying to earn God\u2019s approval. How is Jesus\u2019 invitation different from what you may have heard about religion?",
      "What tends to keep you from \u201ccoming\u201d to Jesus honestly, whether it is pride, busyness, doubt, or something else?",
      "If a \u201cyoke\u201d means linking your life to Jesus and learning from him, what is one area of your life where you would like to learn his way of doing things instead of relying on your own?",
      "Jesus calls himself \u201cgentle and lowly in heart.\u201d How does that compare with the picture of God you grew up with? How does it change the way you approach him?",
      "What does \u201crest for your souls\u201d mean to you practically? What would it look like in your life this week?",
    ],
  },
  // ==================== LESSON 15 ====================
  {
    id: "35",
    version: 1,
    title: "Lord of the Sabbath: Mercy Over Rules",
    subtitle: "Jesus and the Sabbath Controversies",
    date: "2026-12-12",
    scheduledDate: "2026-12-12",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 12:1-14",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Matthew 12 opens with two Sabbath controversies that bring the conflict between Jesus and the Pharisees to a boiling point. Immediately after Jesus\u2019 invitation to rest (Matthew 11:28\u201330), his disciples walk through a grain field on the Sabbath and pluck heads of grain to eat. The Pharisees accuse them of breaking Sabbath law.</p>" +
          "<p>To understand the intensity of this clash, we need to know how Sabbath observance had developed by the first century. The original command in Exodus 20:8\u201311 was simple: remember the Sabbath day, keep it holy, and do no work. But between the exile and the time of Jesus, scribal schools built elaborate \u201cfence laws\u201d around the Sabbath to prevent any possible violation. The Mishnah (compiled around AD 200 but reflecting earlier traditions) lists thirty-nine categories of prohibited work (<em>melachot</em>), derived from the kinds of labor used to build the tabernacle.</p>" +
          "<p>By plucking grain, the disciples were \u201creaping.\u201d By rubbing the kernels in their hands, they were \u201cthreshing.\u201d By separating grain from chaff, they were \u201cwinnowing.\u201d Three violations in a single snack. The Pharisees were not making this up. Within their system, these were real infractions. The question was whether their system accurately reflected God\u2019s heart. Some of the Pharisaic Sabbath rules went to remarkable lengths. You could not look in a mirror on the Sabbath lest you be tempted to pluck a grey hair (reaping). A donkey could be led from its stable, but the saddle had to be placed on it the day before. An egg laid on the Sabbath could not be eaten unless you killed the chicken for Sabbath-breaking. These traditions were intended to honor God, but they had the effect of turning a day meant for delight and rest into a minefield of anxiety.</p>" +
          "<p>Jesus responds with three arguments. First, he cites David eating the consecrated bread when he was hungry (1 Samuel 21:1\u20136). Second, he points out that priests work in the temple every Sabbath and are blameless. Third, he quotes Hosea 6:6 again: \u201cI desire mercy, not sacrifice.\u201d Then he makes a stunning claim: \u201cThe Son of Man is Lord of the Sabbath\u201d (Matthew 12:8). He is not just arguing about rules. He is declaring that the one who created the Sabbath is standing in front of them.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup> At that time Jesus went on the sabbath day through the corn; and his disciples were an hungred, and began to pluck the ears of corn and to eat. <sup>2</sup> But when the Pharisees saw it, they said unto him, Behold, thy disciples do that which is not lawful to do upon the sabbath day. <sup>3</sup> But he said unto them, Have ye not read what David did, when he was an hungred, and they that were with him; <sup>4</sup> How he entered into the house of God, and did eat the shewbread, which was not lawful for him to eat, neither for them which were with him, but only for the priests? <sup>5</sup> Or have ye not read in the law, how that on the sabbath days the priests in the temple profane the sabbath, and are blameless? <sup>6</sup> But I say unto you, That in this place is one greater than the temple. <sup>7</sup> But if ye had known what this meaneth, I will have mercy, and not sacrifice, ye would not have condemned the guiltless. <sup>8</sup> For the Son of man is Lord even of the sabbath day.</p>",
        reference: "Matthew 12:1-8",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>The Pharisees see the disciples eating grain on the Sabbath and immediately object: \u201cLook, your disciples are doing what is not lawful to do on the Sabbath.\u201d In their framework, the disciples are breaking the law. But Jesus challenges their entire framework.</p>" +
          "<p>He asks, \u201cHaven\u2019t you read what David did when he was hungry?\u201d David and his men entered the house of God and ate the consecrated bread that only priests were allowed to eat (1 Samuel 21:1\u20136). Yet nowhere in Scripture is David condemned for that act. Jesus is making the point that the Pharisees\u2019 rigid system cannot even account for events in their own Bible.</p>" +
          "<p>Then he says something that must have taken their breath away: \u201cSomething greater than the temple is here.\u201d The temple was the center of Jewish worship, the place where God dwelled on earth. Jesus is claiming to be greater than that. If the temple justified the priests\u2019 Sabbath work, how much more does the presence of the Son of God justify his disciples?</p>" +
          "<p>He closes with Hosea 6:6: \u201cIf you had known what this means, \u2018I desire mercy, not sacrifice,\u2019 you would not have condemned the guiltless.\u201d God is not interested in religious precision that lacks compassion. The Sabbath was made for human flourishing, not for human crushing.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The Mishnah\u2019s thirty-nine categories of work (<em>Shabbat</em> 7:2) included sowing, plowing, reaping, threshing, winnowing, grinding, baking, and many more. Each had sub-categories that multiplied the restrictions.</li>" +
          "<li>The Qumran community (Dead Sea Scrolls) was even stricter than the Pharisees, ruling that you could not rescue an animal from a pit on the Sabbath (CD 11:13\u201314). Jesus assumes the opposite in the next scene (Matthew 12:11).</li>" +
          "<li>\u201cLord of the Sabbath\u201d is one of Jesus\u2019 most direct claims to divine authority, since God himself instituted the Sabbath (Genesis 2:2\u20133; Exodus 20:11).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The Pharisees created rules to protect the Sabbath but ended up burdening people. Have you ever seen well-intentioned religious practices become a source of guilt or anxiety rather than joy? What happened?</li>" +
          "<li>Jesus says God desires mercy, not sacrifice. Where in your life might God be asking you to choose compassion over being \u201cright\u201d?</li>" +
          "<li>Jesus claims to be \u201cLord of the Sabbath.\u201d How does that claim affect the way you think about rest, worship, and how you spend your time?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>9</sup> And when he was departed thence, he went into their synagogue: <sup>10</sup> And, behold, there was a man which had his hand withered. And they asked him, saying, Is it lawful to heal on the sabbath days? that they might accuse him. <sup>11</sup> And he said unto them, What man shall there be among you, that shall have one sheep, and if it fall into a pit on the sabbath day, will he not lay hold on it, and lift it out? <sup>12</sup> How much then is a man better than a sheep? Wherefore it is lawful to do well on the sabbath days. <sup>13</sup> Then saith he to the man, Stretch forth thine hand. And he stretched it forth; and it was restored whole, like as the other. <sup>14</sup> Then the Pharisees went out, and held a council against him, how they might destroy him.</p>",
        reference: "Matthew 12:9-14",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus goes into the synagogue and finds a man with a withered hand. The Pharisees ask him, \u201cIs it lawful to heal on the Sabbath?\u201d Matthew tells us they asked this to find a reason to accuse him. They are not curious. They are setting a trap.</p>" +
          "<p>Jesus answers with a question of his own: \u201cWhich one of you, if you have a single sheep and it falls into a pit on the Sabbath, will not grab hold of it and lift it out? How much more valuable is a person than a sheep!\u201d The logic is devastating. Even the Pharisees allowed practical exceptions when property was at stake. Jesus forces them to admit that if they would rescue a sheep, surely it is right to restore a human being.</p>" +
          "<p>Then he says to the man, \u201cStretch out your hand.\u201d The man stretches it out, and it is completely restored. Notice that Jesus does not touch the man or mix a poultice. He speaks a word. From the Pharisees\u2019 own perspective, there is no \u201cwork\u201d to point to. Yet they are furious, and Matthew tells us they \u201cwent out and conspired against him, how to destroy him.\u201d</p>" +
          "<p>That response reveals the real issue. This was never only about Sabbath rules. It was about authority. Jesus claimed to be Lord of the Sabbath, greater than the temple, and the living embodiment of God\u2019s mercy. The Pharisees had to accept that claim or eliminate the one who made it.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Luke\u2019s account says this event happened about a week after the grain field incident (Luke 6:6), and the man seems to have been placed there deliberately by the Pharisees as a test (Mark 3:2).</li>" +
          "<li>The Pharisees did allow healing on the Sabbath when life was in danger (<em>pikuach nefesh</em>), but a withered hand was not life-threatening, which is why they considered it a violation.</li>" +
          "<li>The Pharisees\u2019 plot to destroy Jesus (Matthew 12:14) is the first explicit mention of a death plot in Matthew and marks a dramatic escalation in the conflict.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus asked, \u201cHow much more valuable is a person than a sheep!\u201d When has someone treated a rule or tradition as more important than a person\u2019s well-being? How did that feel?</li>" +
          "<li>The man with the withered hand had to stretch out his hand in front of everyone, trusting Jesus publicly. Where is God asking you to step out in trust, even if it feels vulnerable?</li>" +
          "<li>The Pharisees responded to Jesus\u2019 goodness with hostility. Have you ever seen people react negatively to genuine kindness or truth? How should we respond when that happens?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, look for an opportunity to choose mercy over rigid correctness. Is there a person near you who needs compassion more than a lecture? How will you follow Jesus\u2019 example?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The Pharisees created rules to protect the Sabbath but ended up burdening people. Have you ever seen well-intentioned religious practices become a source of guilt or anxiety rather than joy? What happened?",
      "Jesus says God desires mercy, not sacrifice. Where in your life might God be asking you to choose compassion over being \u201cright\u201d?",
      "Jesus claims to be \u201cLord of the Sabbath.\u201d How does that claim affect the way you think about rest, worship, and how you spend your time?",
      "Jesus asked, \u201cHow much more valuable is a person than a sheep!\u201d When has someone treated a rule or tradition as more important than a person\u2019s well-being? How did that feel?",
      "The man with the withered hand had to stretch out his hand in front of everyone, trusting Jesus publicly. Where is God asking you to step out in trust, even if it feels vulnerable?",
      "The Pharisees responded to Jesus\u2019 goodness with hostility. Have you ever seen people react negatively to genuine kindness or truth? How should we respond when that happens?",
    ],
  },
  // ==================== LESSON 16 ====================
  {
    id: "36",
    version: 1,
    title: "Trusting God in Ministry and Weariness",
    subtitle: "Jesus Sends the Twelve and Invites Rest",
    date: "2026-12-19",
    scheduledDate: "2026-12-19",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 10:16-31",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>After giving the twelve their initial mission instructions (Matthew 10:1\u201315), Jesus warns them about the opposition they will face. He compares them to sheep among wolves and tells them to be \u201cwise as serpents and innocent as doves\u201d (Matthew 10:16).</p>" +
          "<p>This warning was not hypothetical. Within a generation, every one of the apostles except John would face persecution, imprisonment, or death. In the immediate context of first-century Palestine, the Sanhedrin had authority to flog offenders in local synagogues, and Roman governors could impose harsher penalties. Jesus is preparing ordinary men for extraordinary pressure.</p>" +
          "<p>Yet in the middle of these warnings, Jesus weaves in some of the most comforting promises in all of Scripture. He tells them that the Spirit of the Father will give them words when they are brought before authorities (Matthew 10:19\u201320). He reminds them that not a single sparrow falls to the ground apart from the Father\u2019s knowledge, and that even the hairs of their head are numbered. \u201cFear not,\u201d he says, \u201cyou are of more value than many sparrows\u201d (Matthew 10:29\u201331).</p>" +
          "<p>The balance is striking. Jesus is completely honest about the cost of following him, and completely confident about the Father\u2019s care for those who pay it.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>16</sup> Behold, I send you forth as sheep in the midst of wolves: be ye therefore wise as serpents, and harmless as doves. <sup>17</sup> But beware of men: for they will deliver you up to the councils, and they will scourge you in their synagogues; <sup>18</sup> And ye shall be brought before governors and kings for my sake, for a testimony against them and the Gentiles. <sup>19</sup> But when they deliver you up, take no thought how or what ye shall speak: for it shall be given you in that same hour what ye shall speak. <sup>20</sup> For it is not ye that speak, but the Spirit of your Father which speaketh in you. <sup>21</sup> And the brother shall deliver up the brother to death, and the father the child: and the children shall rise up against their parents, and cause them to be put to death. <sup>22</sup> And ye shall be hated of all men for my name\u2019s sake: but he that endureth to the end shall be saved. <sup>23</sup> But when they persecute you in this city, flee ye into another: for verily I say unto you, Ye shall not have gone over the cities of Israel, till the Son of man be come.</p>",
        reference: "Matthew 10:16-23",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus does not sugarcoat what is coming. He says, \u201cI am sending you out like sheep among wolves.\u201d That is a vivid image. Sheep are not equipped to fight wolves. Their survival depends entirely on the shepherd.</p>" +
          "<p>Then he gives them a memorable instruction: \u201cBe wise as serpents and innocent as doves.\u201d In other words, be shrewd, be alert, think carefully about how you navigate hostile environments. But do it without becoming cynical, manipulative, or losing your integrity. That is a difficult balance, and it takes the Spirit\u2019s help to maintain.</p>" +
          "<p>He warns that they will be handed over to councils, flogged in synagogues, and brought before governors and kings. But even there, he says, \u201cDo not be anxious about how you are to speak or what you are to say, for it is not you who speak, but the Spirit of your Father speaking through you.\u201d</p>" +
          "<p>I find that promise deeply reassuring. When we face situations that feel beyond our ability, whether it is a conversation about our faith, a moment of conflict, or a season of real hardship, God does not leave us on our own. His Spirit is present and active, giving us what we need in the moment.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cWise as serpents, innocent as doves\u201d blends Old Testament images. The serpent is associated with shrewdness (Genesis 3:1), and the dove with purity and vulnerability (Song of Solomon 2:14; Hosea 7:11).</li>" +
          "<li>Flogging in synagogues was a judicial punishment of up to thirty-nine lashes, administered by local Jewish courts for violations of religious law (2 Corinthians 11:24; Acts 26:11).</li>" +
          "<li>The promise of the Spirit speaking through them anticipates the fuller experience of Pentecost (Acts 2) and the boldness of the early church before authorities (Acts 4:8\u201313).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>\u201cWise as serpents and innocent as doves.\u201d Which of those two sides is more natural for you, and which do you need to grow in?</li>" +
          "<li>Has there been a time when you needed to speak up for your faith or for what was right and felt God helping you with the words? What happened?</li>" +
          "<li>Jesus is completely honest about the cost of following him. How does his honesty actually build your trust in him, compared to a leader who might promise only good things?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>28</sup> And fear not them which kill the body, but are not able to kill the soul: but rather fear him which is able to destroy both soul and body in hell. <sup>29</sup> Are not two sparrows sold for a farthing? and one of them shall not fall on the ground without your Father. <sup>30</sup> But the very hairs of your head are all numbered. <sup>31</sup> Fear ye not therefore, ye are of more value than many sparrows.</p>",
        reference: "Matthew 10:28-31",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>In the middle of all these warnings, Jesus says, \u201cDo not fear those who kill the body but cannot kill the soul.\u201d That is a powerful reorientation. We tend to fear whatever threatens our physical comfort, our reputation, or our security. Jesus says there is only one whose opinion ultimately matters, and that is God.</p>" +
          "<p>Then, almost in the same breath, he turns from the most sobering statement to the most tender one: \u201cAre not two sparrows sold for a penny? And not one of them will fall to the ground apart from your Father. But even the hairs of your head are all numbered. Fear not, therefore; you are of more value than many sparrows.\u201d</p>" +
          "<p>Sparrows were among the cheapest items in the marketplace, practically worthless. Yet God notices when a single one falls. If that is how attentive he is to a sparrow, how much more does he notice you?</p>" +
          "<p>I love the detail about the hairs of your head being numbered. That is not a general awareness. That is intimate, exhaustive knowledge. The God of the universe knows you that specifically. And because he knows you, and because he values you, you do not need to be controlled by fear. Fear may come. But it does not get the final word. God\u2019s care does.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cDo not fear\u201d appears repeatedly in Jesus\u2019 teaching and echoes the Lord\u2019s frequent encouragement to Israel: \u201cFear not, for I am with you\u201d (Isaiah 41:10, 13; 43:1).</li>" +
          "<li>Two sparrows for a penny (<em>assarion</em>, a small Roman copper coin) indicates the lowest commercial value. Luke 12:6 says five sparrows for two pennies, meaning the fifth was essentially thrown in for free, yet God still notices it.</li>" +
          "<li>The contrast between fearing people and fearing God runs through Scripture\u2019s wisdom tradition (Proverbs 29:25; Psalm 56:4, 11).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>What is the fear that has the strongest grip on your life right now? How does Jesus\u2019 teaching here speak to it?</li>" +
          "<li>\u201cEven the hairs of your head are numbered.\u201d What does God\u2019s detailed, personal knowledge of you mean for the way you approach a difficult situation this week?</li>" +
          "<li>Jesus says we are \u201cof more value than many sparrows.\u201d When do you find it hardest to believe that you are deeply valued by God, and what helps you come back to that truth?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, when fear or worry shows up, try this: pause and say, \u201cGod, you number the hairs on my head. You see this situation. I am going to trust your care right now.\u201d Write down what you notice when you do this.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "\u201cWise as serpents and innocent as doves.\u201d Which of those two sides is more natural for you, and which do you need to grow in?",
      "Has there been a time when you needed to speak up for your faith or for what was right and felt God helping you with the words? What happened?",
      "Jesus is completely honest about the cost of following him. How does his honesty actually build your trust in him, compared to a leader who might promise only good things?",
      "What is the fear that has the strongest grip on your life right now? How does Jesus\u2019 teaching here speak to it?",
      "\u201cEven the hairs of your head are numbered.\u201d What does God\u2019s detailed, personal knowledge of you mean for the way you approach a difficult situation this week?",
      "Jesus says we are \u201cof more value than many sparrows.\u201d When do you find it hardest to believe that you are deeply valued by God, and what helps you come back to that truth?",
    ],
  },
  // ==================== LESSON 17 ====================
  {
    id: "37",
    version: 1,
    title: "The Sower and the Seed",
    subtitle: "Hearing God\u2019s Word",
    date: "2026-12-26",
    scheduledDate: "2026-12-26",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 13:1-23",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Matthew 13 marks a shift in Jesus\u2019 ministry. Opposition from the Pharisees has intensified (Matthew 12), and Jesus begins teaching the crowds in parables, stories drawn from everyday life that reveal truths about the kingdom of heaven to those with ears to hear.</p>" +
          "<p>The Parable of the Sower would have been immediately vivid to his audience. Galilee was one of the most fertile agricultural regions in Palestine, with rich red soil and reliable winter rainfall averaging 400\u2013600mm, ideal for growing wheat and barley. Roughly 80\u201390% of Galileans were farmers, and the region around Nazareth sat alongside the largest tract of arable land in Galilee. These people had grown grain for generations. They knew exactly what Jesus was describing.</p>" +
          "<p>First-century sowing in Palestine was done by hand, broadcasting seed across a prepared field. Because fields were often bordered by footpaths, rocky limestone shelves just below the topsoil, and patches of thorny scrub, some seed inevitably landed on unsuitable ground. Paths were sometimes salted to keep them clear for walking, making them completely inhospitable to seed. The audience would have recognized each type of soil from their own experience.</p>" +
          "<p>The use of agricultural imagery for teaching had deep roots in both Jewish and Greco-Roman traditions. In Jewish thought, the Hebrew word <em>mashal</em> (parable) covered proverbs, riddles, and illustrative stories. Sowing and harvest were standard metaphors for God\u2019s work through his word and Spirit (Isaiah 55:10\u201311; Hosea 10:12). In Greco-Roman education, teachers (sowers) taught (sowed), and their words (seeds) were received by students (soils). Jesus draws on both traditions but transforms them. He explains that the seed is \u201cthe word of the kingdom\u201d and the soils represent the human heart in its varying conditions (Matthew 13:18\u201323).</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup> The same day went Jesus out of the house, and sat by the sea side. <sup>2</sup> And great multitudes were gathered together unto him, so that he went into a ship, and sat; and the whole multitude stood on the shore. <sup>3</sup> And he spake many things unto them in parables, saying, Behold, a sower went forth to sow; <sup>4</sup> And when he sowed, some seeds fell by the way side, and the fowls came and devoured them up: <sup>5</sup> Some fell upon stony places, where they had not much earth: and forthwith they sprung up, because they had no deepness of earth: <sup>6</sup> And when the sun was up, they were scorched; and because they had no root, they withered away. <sup>7</sup> And some fell among thorns; and the thorns sprung up, and choked them: <sup>8</sup> But other fell into good ground, and brought forth fruit, some an hundredfold, some sixtyfold, some thirtyfold. <sup>9</sup> Who hath ears to hear, let him hear.</p>",
        reference: "Matthew 13:1-9",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Picture Jesus sitting in a boat just offshore while a large crowd stands on the beach. He tells them about a farmer who went out to sow. Some seed fell on the path. Birds came and ate it immediately. Some fell on rocky places with thin soil. It sprang up fast but withered in the sun because it had no root. Some fell among thorns, which grew up and choked it. And some fell on good soil, where it produced a crop, thirty, sixty, or a hundred times what was sown.</p>" +
          "<p>Everyone in that crowd would have nodded. They had watched this happen in their own fields. Farming in Galilee was labor-intensive, entirely dependent on manual sowing and seasonal rains. A farmer could not control where every seed landed, and everyone knew that a portion of the seed would be lost.</p>" +
          "<p>Jesus ends the parable with a phrase he uses when something needs careful attention: \u201cWhoever has ears, let them hear.\u201d He knows that some in the crowd will hear the story and miss the point, while others will take it deep into their hearts and let it change the way they live.</p>" +
          "<p>We have all seen these patterns at work. We have watched people hear the message of Jesus and walk away indifferent. We have seen others respond with excitement that fades quickly. We have watched faith get squeezed out by worry and busyness. And we have also seen quiet, steady people whose faith bears fruit year after year. The question for each of us is: what kind of soil am I right now?</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Galilean farmers sowed before plowing in some cases, which explains why seed landed on paths and rocky ground that would later be turned. Practices varied regionally.</li>" +
          "<li>The hundredfold yield is extraordinary. A typical harvest in Galilee yielded about seven- to tenfold, with thirty being exceptional. Jesus\u2019 numbers emphasize God\u2019s lavish blessing where the word takes root.</li>" +
          "<li>Jesus later tells the disciples that he speaks in parables partly because the crowds\u2019 hearts have grown dull (Matthew 13:14\u201315), echoing Isaiah 6:9\u201310.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>When you think about the four soils, which one best describes where your heart has been recently? What has shaped that condition?</li>" +
          "<li>The farmer scatters seed generously, knowing some will be lost. What does that teach you about how God offers his word and grace?</li>" +
          "<li>Who in your life comes to mind as an example of \u201cgood soil,\u201d someone whose faith has quietly and steadily borne fruit over many years? What can you learn from them?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>18</sup> Hear ye therefore the parable of the sower. <sup>19</sup> When any one heareth the word of the kingdom, and understandeth it not, then cometh the wicked one, and catcheth away that which was sown in his heart. This is he which received seed by the way side. <sup>20</sup> But he that received the seed into stony places, the same is he that heareth the word, and anon with joy receiveth it; <sup>21</sup> Yet hath he not root in himself, but dureth for a while: for when tribulation or persecution ariseth because of the word, by and by he is offended. <sup>22</sup> He also that received seed among the thorns is he that heareth the word; and the care of this world, and the deceitfulness of riches, choke the word, and he becometh unfruitful. <sup>23</sup> But he that received seed into the good ground is he that heareth the word, and understandeth it; which also beareth fruit, and bringeth forth, some an hundredfold, some sixty, some thirty.</p>",
        reference: "Matthew 13:18-23",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus explains the parable to his disciples privately. The seed on the path represents someone who hears the message of the kingdom but does not understand it. The evil one comes and snatches it away. The rocky soil represents someone who receives the word with immediate joy but has no root. When trouble or pressure comes, they quickly fall away.</p>" +
          "<p>The thorny soil represents someone who hears, but the worries of this life and the pull of wealth choke the word until it becomes unfruitful. Many of us recognize that description. We may not struggle with outright rejection of God. Instead, the slow creep of anxiety, distraction, and the desire for more gradually edges faith to the margins.</p>" +
          "<p>The good soil represents someone who hears the word, understands it, and bears fruit, producing thirty, sixty, or a hundred times what was sown. In Scripture, \u201cunderstanding\u201d means more than intellectual agreement. It means grasping truth with the heart and responding with obedience (Proverbs 2:1\u20135). Fruitfulness comes from a life that stays connected to God\u2019s word the way roots stay connected to water.</p>" +
          "<p>That fruit looks different in different seasons. For some, it may be active ministry and visible service. For others, it may be quiet faithfulness: prayer, kindness, patience in suffering, a single encouraging word spoken at the right moment. The size of the harvest varies, but all good soil produces something.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The Hebrew concept of \u201cunderstanding\u201d (<em>bin</em>) involves discernment and the ability to distinguish between paths, closely related to wisdom (Proverbs 4:7; Daniel 9:22).</li>" +
          "<li>The \u201cworries of this life and deceitfulness of wealth\u201d echo Jesus\u2019 earlier Sermon on the Mount teaching about worry and serving God rather than money (Matthew 6:19\u201334).</li>" +
          "<li>The parable of the sower is the only parable that all three Synoptic Gospels record along with Jesus\u2019 full explanation (Mark 4:1\u201320; Luke 8:4\u201315), which highlights its importance as a key to understanding the others.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus names \u201cthe worries of this life and the deceitfulness of wealth\u201d as thorns that choke faith. Which of those two do you find pulls at you more, and what has helped you resist it?</li>" +
          "<li>If fruitfulness can look different in different seasons, what kind of fruit do you think God is growing in you right now?</li>" +
          "<li>How can you tend the \u201csoil\u201d of your heart this week so that God\u2019s word can take deeper root? What specific practice would help?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, choose one verse or truth from Scripture and give it room to take root. Read it each morning, think about it during the day, and notice how it begins to shape your responses. At the end of the week, write down what you observed.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "When you think about the four soils, which one best describes where your heart has been recently? What has shaped that condition?",
      "The farmer scatters seed generously, knowing some will be lost. What does that teach you about how God offers his word and grace?",
      "Who in your life comes to mind as an example of \u201cgood soil,\u201d someone whose faith has quietly and steadily borne fruit over many years? What can you learn from them?",
      "Jesus names \u201cthe worries of this life and the deceitfulness of wealth\u201d as thorns that choke faith. Which of those two do you find pulls at you more, and what has helped you resist it?",
      "If fruitfulness can look different in different seasons, what kind of fruit do you think God is growing in you right now?",
      "How can you tend the \u201csoil\u201d of your heart this week so that God\u2019s word can take deeper root? What specific practice would help?",
    ],
  },
  // ==================== LESSON 18 ====================
  {
    id: "38",
    version: 1,
    title: "The Mustard Seed and the Leaven",
    subtitle: "Small Beginnings, Great Growth",
    date: "2027-01-02",
    scheduledDate: "2027-01-02",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 13:31-35",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>After the longer parable of the sower and the parable of the wheat and tares, Jesus tells two very brief parables back to back: the mustard seed and the leaven. Both describe the kingdom of heaven starting in a way that looks insignificant and growing into something far greater than anyone expected.</p>" +
          "<p>The mustard seed was proverbially tiny in Jewish speech, used as a figure for the smallest possible quantity. The Mishnah actually classified the mustard plant as a garden herb and discouraged growing it in formal gardens because it spread aggressively and was considered something of a weed. Yet when fully grown, the black mustard plant (<em>Brassica nigra</em>) could reach three to five meters in height in the rich soil of Galilee, tall enough for birds to rest in its branches.</p>" +
          "<p>The image of birds nesting in a great tree echoes Old Testament passages where mighty kingdoms are pictured as trees sheltering the nations (Ezekiel 17:22\u201324; 31:3\u20136; Daniel 4:10\u201312). The surprise in Jesus\u2019 parable is that this \u201ctree\u201d grows from a tiny weed seed, planted in a field. God\u2019s kingdom does not arrive through political power or military conquest. It starts small, in an out-of-the-way corner, and spreads in ways that the powerful do not anticipate.</p>" +
          "<p>The parable of the leaven follows the same logic but shifts indoors. A woman takes a small amount of yeast and mixes it into three measures of flour, roughly fifty pounds, enough bread for over a hundred people. The reference to \u201cthree measures\u201d may echo Genesis 18:6, where Sarah prepared that same quantity for the Lord\u2019s visit at the oaks of Mamre. The leaven works silently and invisibly until the entire batch of dough is transformed. Matthew notes that Jesus used parables to fulfill the words of Psalm 78:2: \u201cI will utter things hidden since the foundation of the world\u201d (Matthew 13:34\u201335).</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>31</sup> Another parable put he forth unto them, saying, The kingdom of heaven is like to a grain of mustard seed, which a man took, and sowed in his field: <sup>32</sup> Which indeed is the least of all seeds: but when it is grown, it is the greatest among herbs, and becometh a tree, so that the birds of the air come and lodge in the branches thereof.</p>",
        reference: "Matthew 13:31-32",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus says the kingdom of heaven is like a mustard seed that a man planted in his field. Though it is the smallest of all the seeds he might sow, it grows into a plant so large that birds come and perch in its branches.</p>" +
          "<p>Think about what Jesus\u2019 audience knew. Mustard was common, cheap, and considered a nuisance in the garden. Nobody looked at a mustard seed and thought \u201ckingdom.\u201d And yet Jesus says that is exactly how God works. The kingdom starts with an itinerant rabbi from Nazareth, a handful of uneducated fishermen, and a message that the powerful dismiss. Within a few generations, that message has reached Rome, North Africa, and beyond.</p>" +
          "<p>Many of you have seen this pattern in your own experience. A single conversation that changed someone\u2019s direction. A faithful prayer that bore fruit years later. A small Bible study that grew into a church. God loves to take what looks insignificant and make something of it that the world never saw coming.</p>" +
          "<p>For anyone who feels that what they have to offer is too small to matter, this parable says otherwise. God does not measure the way we measure. A tiny seed of faithfulness, planted in his hands, can become something that shelters others for generations.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The Mishnah (<em>Kilayim</em> 3:2) restricted mustard to the field rather than the garden because it spread invasively, which may be why Matthew specifies \u201chis field\u201d rather than \u201chis garden\u201d (compare Luke 13:19, which says \u201cgarden\u201d).</li>" +
          "<li>The Old Testament \u201ctree\u201d imagery for kingdoms (Ezekiel 17, 31; Daniel 4) would have been familiar to Jesus\u2019 Jewish listeners and carries the idea of nations finding refuge under a powerful realm.</li>" +
          "<li>Jesus\u2019 point rests on the contrast between the seed\u2019s smallness and the plant\u2019s size, highlighting God\u2019s surprising methods rather than making a botanical claim.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Think of a time when something small, a word, a prayer, a simple act of kindness, grew into something much bigger than you imagined. What happened?</li>" +
          "<li>Where in your life right now might God be planting something that looks tiny but could have an impact you cannot yet see?</li>" +
          "<li>If God\u2019s kingdom often starts in overlooked places, how does that change the way you think about your own role, wherever you are?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>33</sup> Another parable spake he unto them; The kingdom of heaven is like unto leaven, which a woman took, and hid in three measures of meal, till the whole was leavened. <sup>34</sup> All these things spake Jesus unto the multitude in parables; and without a parable spake he not unto them: <sup>35</sup> That it might be fulfilled which was spoken by the prophet, saying, I will open my mouth in parables; I will utter things which have been kept secret from the foundation of the world.</p>",
        reference: "Matthew 13:33-35",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus adds a second picture: the kingdom of heaven is like leaven that a woman took and mixed into three measures of flour until the whole batch was leavened.</p>" +
          "<p>Anyone who has baked bread knows how this works. You mix a small lump of yeast into a large bowl of dough. For a while, nothing visible happens. Then, gradually, the dough begins to rise. The yeast works its way through every part of the batch, transforming it from the inside out. By the time you come back, the dough has doubled in size.</p>" +
          "<p>Three measures of flour is an enormous amount, enough to feed well over a hundred people. The point is the disproportion between the small lump of yeast and the massive result. God\u2019s kingdom often advances the same way: quietly, gradually, from the inside, in ways that are invisible at first but ultimately change everything.</p>" +
          "<p>Think about the influence of a single faithful person in a family, a workplace, or a community. A grandmother who prays for decades. A friend who lives with quiet integrity. A neighbor who shows consistent kindness. That influence spreads outward in ways you may never fully see, transforming the atmosphere around them the way leaven transforms dough.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Leaven in Scripture sometimes symbolizes corruption (1 Corinthians 5:6\u20138; Galatians 5:9), but context determines meaning. Here the point is pervasive, transforming influence within God\u2019s kingdom.</li>" +
          "<li>\u201cThree measures of flour\u201d (<em>tria sata</em>) equals roughly one <em>ephah</em>, the same amount Sarah prepared when the Lord appeared to Abraham (Genesis 18:6), hinting at God\u2019s abundant provision.</li>" +
          "<li>Matthew 13:34\u201335 explains that Jesus\u2019 parable-teaching fulfills Psalm 78:2 and is part of God\u2019s plan to reveal previously hidden truths about his kingdom.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The leaven works invisibly for a long time before the results become obvious. Where have you seen God working slowly and quietly in your life or in someone else\u2019s, with results that only became clear later?</li>" +
          "<li>If your faith were leaven in the \u201cdough\u201d of your daily environment, where would you most want it to spread?</li>" +
          "<li>Both the mustard seed and the leaven start small. How does that encourage you when you feel like your efforts for God are barely making a difference?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, do one small, quiet act of faithfulness each day, whether prayer, encouragement, or service, and trust God to multiply it like a mustard seed or leaven. At the end of the week, reflect on what you noticed.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Think of a time when something small, a word, a prayer, a simple act of kindness, grew into something much bigger than you imagined. What happened?",
      "Where in your life right now might God be planting something that looks tiny but could have an impact you cannot yet see?",
      "If God\u2019s kingdom often starts in overlooked places, how does that change the way you think about your own role, wherever you are?",
      "The leaven works invisibly for a long time before the results become obvious. Where have you seen God working slowly and quietly in your life or in someone else\u2019s, with results that only became clear later?",
      "If your faith were leaven in the \u201cdough\u201d of your daily environment, where would you most want it to spread?",
      "Both the mustard seed and the leaven start small. How does that encourage you when you feel like your efforts for God are barely making a difference?",
    ],
  },
  // ==================== LESSON 19 ====================
  {
    id: "39",
    version: 1,
    title: "The Hidden Treasure and the Pearl",
    subtitle: "The Kingdom Is Worth Everything",
    date: "2027-01-09",
    scheduledDate: "2027-01-09",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 13:44-46",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>Jesus now tells two very short parables, each only a single verse, about discovering something of extraordinary value. In the first, a man finds a treasure hidden in a field. In the second, a merchant finds a pearl of great price. Both respond the same way: they joyfully give up everything they have to acquire what they have found.</p>" +
          "<p>Burying treasure in the ground was a common practice in the ancient Near East, especially in times of war or political instability. There were no banks in the modern sense. People hid gold, silver, and precious objects underground, and if the owner died, fled, or was killed, the treasure could remain undiscovered for generations. The Jewish historian Josephus records that after the Roman destruction of Jerusalem in AD 70, soldiers found large caches of gold and silver that had been buried beneath homes and courtyards. The Copper Scroll from Qumran, a first-century document found among the Dead Sea Scrolls, contains a detailed list of buried treasures, including gold, silver, and priestly garments hidden at various locations. Jesus\u2019 listeners would have known about hidden treasure and perhaps even dreamed of finding some.</p>" +
          "<p>Pearls were among the most sought-after luxuries in the ancient world. They were harvested primarily from the Red Sea, the Persian Gulf, and the Indian Ocean, and their value in the Roman Empire was immense. Pliny the Elder called the pearl the most valuable of all precious things. Wealthy Romans wore pearls as a sign of the highest status, and pearl merchants traveled long distances to acquire the finest specimens. The parable\u2019s merchant is a professional dealer who knows quality and recognizes when he has found something incomparable.</p>" +
          "<p>Both parables communicate the same core truth: the kingdom of heaven is so valuable that a person who truly sees its worth will gladly part with lesser things to possess it. The parables do not teach that we purchase salvation through our own effort. They highlight the surpassing worth of knowing God and belonging to his kingdom, a theme Paul echoes when he says, \u201cI count everything as loss because of the surpassing worth of knowing Christ Jesus my Lord\u201d (Philippians 3:8).</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>44</sup> Again, the kingdom of heaven is like unto treasure hid in a field; the which when a man hath found, he hideth, and for joy thereof goeth and selleth all that he hath, and buyeth that field.</p>",
        reference: "Matthew 13:44",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus says the kingdom of heaven is like a treasure hidden in a field. A man stumbles across it, hides it again, and in his joy goes and sells everything he has to buy that field.</p>" +
          "<p>I want you to notice the word \u201cjoy.\u201d This man does not sell everything with a heavy heart and gritted teeth. He does so with delight. He has found something so valuable that everything else looks small by comparison. Letting go of his other possessions feels like trading pennies for gold.</p>" +
          "<p>Many of us have experienced versions of this. A relationship that made us willing to rearrange our whole life. A calling that made comfort seem unimportant. A moment with God that put every other pursuit in perspective. Jesus is saying that the kingdom of heaven has that kind of worth, and more.</p>" +
          "<p>The man in the parable was not looking for the treasure. He stumbled onto it. Some of us came to faith that way, caught off guard by a truth or an encounter we were not expecting. God has a way of showing up in ordinary fields and revealing something extraordinary.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>In Jewish law, a person who found treasure in a newly purchased field could legally keep it, since ownership of land included its contents. The man\u2019s strategy of buying the field was a legitimate way to acquire the treasure (Bava Metzia 25b\u201326a in later rabbinic discussion).</li>" +
          "<li>Many interpreters also see a reverse angle: Jesus himself is the one who \u201csold all he had\u201d (his heavenly glory) to purchase the field (the world) for the sake of his people (Matthew 13:38; 2 Corinthians 8:9). Both readings carry truth, and the teacher can mention both without entering controversy.</li>" +
          "<li>The joy of discovery echoes the joy of finding lost things in Luke 15 (the lost sheep, the lost coin, the lost son).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The man sold everything with joy because he saw what the treasure was worth. When has knowing God felt like that kind of joyful exchange for you?</li>" +
          "<li>Think about the things that compete for first place in your heart: comfort, security, reputation, control. If you weighed them against the treasure of the kingdom, what shifts?</li>" +
          "<li>The man found the treasure by surprise. How did God first get your attention, and what \u201ctreasure\u201d did he reveal to you?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>45</sup> Again, the kingdom of heaven is like unto a merchant man, seeking goodly pearls: <sup>46</sup> Who, when he had found one pearl of great price, went and sold all that he had, and bought it.</p>",
        reference: "Matthew 13:45-46",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus tells a second, closely related parable. A merchant is searching for fine pearls. When he finds one of extraordinary value, he goes away and sells everything he has in order to buy it.</p>" +
          "<p>This man is different from the one in the field. The field worker stumbled onto his treasure. This merchant has been looking for a long time. He is an expert. He has handled many pearls and knows quality when he sees it. When this one pearl appears, he instantly recognizes that everything else in his collection falls short of it.</p>" +
          "<p>Some people come to faith suddenly, like the man in the field. Others search for years, exploring philosophies, religions, and experiences, until they finally encounter Christ and realize he is what they have been searching for all along. Both paths lead to the same conclusion: the kingdom of heaven surpasses everything else.</p>" +
          "<p>And again, the response involves giving up everything. Following Jesus carries real cost: comfort, control, the approval of people who do not understand. But the parable frames that cost as a willing exchange, like a merchant who gladly trades an entire collection for the one pearl that outshines them all. When we truly see the value of what we have in Christ, the things we release stop feeling like losses.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Pearls were the most prized gemstones in the Roman world, sometimes worth more than large estates. Cleopatra reportedly dissolved a pearl in vinegar to demonstrate Egypt\u2019s wealth before Mark Antony.</li>" +
          "<li>Pearl merchants traveled vast distances through the Middle East, India, and the Persian Gulf, making this character a picture of determined, lifelong seeking (Proverbs 2:3\u20135).</li>" +
          "<li>The paired parables reinforce one central truth through two different angles, a characteristic rabbinic teaching method that Jesus uses throughout Matthew 13.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The merchant had been searching a long time before he found the pearl. If you are still searching in some area of your faith, what are you looking for, and how might Jesus already be the answer?</li>" +
          "<li>What has following Jesus cost you, and looking back, how do you feel about that exchange today?</li>" +
          "<li>If you could help someone else see the value of the \u201cpearl,\u201d what would you most want them to understand about knowing Christ?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, take a few minutes to write down what you have in Christ: forgiveness, his presence, hope, purpose, belonging. Read the list when you are tempted to think you are missing out. Let the value of the treasure reshape your perspective.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The man sold everything with joy because he saw what the treasure was worth. When has knowing God felt like that kind of joyful exchange for you?",
      "Think about the things that compete for first place in your heart: comfort, security, reputation, control. If you weighed them against the treasure of the kingdom, what shifts?",
      "The man found the treasure by surprise. How did God first get your attention, and what \u201ctreasure\u201d did he reveal to you?",
      "The merchant had been searching a long time before he found the pearl. If you are still searching in some area of your faith, what are you looking for, and how might Jesus already be the answer?",
      "What has following Jesus cost you, and looking back, how do you feel about that exchange today?",
      "If you could help someone else see the value of the \u201cpearl,\u201d what would you most want them to understand about knowing Christ?",
    ],
  },
  // ==================== LESSON 20 ====================
  {
    id: "40",
    version: 1,
    title: "Jesus Feeds the Five Thousand",
    subtitle: "He Provides for Every Need",
    date: "2027-01-16",
    scheduledDate: "2027-01-16",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 14:13-21",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>The feeding of the five thousand is the only miracle apart from the resurrection recorded in all four Gospels (Matthew 14:13\u201321; Mark 6:30\u201344; Luke 9:10\u201317; John 6:1\u201314), which indicates how significant the early church considered it.</p>" +
          "<p>The event takes place at a critical moment. Jesus has just learned that John the Baptist has been executed by Herod Antipas (Matthew 14:1\u201312). He withdraws by boat to a remote area near the northeastern shore of the Sea of Galilee, likely seeking solitude for grief and prayer. But the crowds see where he is heading, leave the towns on foot, and arrive before him.</p>" +
          "<p>Matthew says Jesus \u201chad compassion on them and healed their sick\u201d (Matthew 14:14). He does not send them away, even in his own grief. As evening approaches, the disciples realize there is no food for a crowd that likely numbered fifteen to twenty thousand, including women and children.</p>" +
          "<p>The setting echoes Israel\u2019s wilderness experience powerfully. After the exodus, God provided manna and quail for the people in a desolate place where food was impossible to obtain (Exodus 16; Numbers 11). Moses told the Lord, \u201cWhere am I to get meat to give to all this people?\u201d (Numbers 11:13), and God answered with miraculous provision. When Jesus takes five loaves and two fish, blesses them, breaks them, and distributes them until everyone is satisfied with twelve baskets of leftovers, the audience would have recognized a prophet like Moses at work (Deuteronomy 18:15).</p>" +
          "<p>The pattern of taking, blessing, breaking, and giving also anticipates the Last Supper (Matthew 26:26). The twelve baskets left over likely represent provision for the twelve tribes of Israel, a sign that Jesus can fully supply his people. John\u2019s Gospel records that the crowd tried to make Jesus king by force after this miracle (John 6:15), confirming that they understood its messianic implications.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>13</sup> When Jesus heard of it, he departed thence by ship into a desert place apart: and when the people had heard thereof, they followed him on foot out of the cities. <sup>14</sup> And Jesus went forth, and saw a great multitude, and was moved with compassion toward them, and he healed their sick. <sup>15</sup> And when it was evening, his disciples came to him, saying, This is a desert place, and the time is now past; send the multitude away, that they may go into the villages, and buy themselves victuals. <sup>16</sup> But Jesus said unto them, They need not depart; give ye them to eat. <sup>17</sup> And they say unto him, We have here but five loaves, and two fishes.</p>",
        reference: "Matthew 14:13-17",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>When Jesus saw the large crowd, he had compassion on them and healed their sick. As evening came, the disciples grew anxious. \u201cThis is a remote place,\u201d they said, \u201cand it\u2019s already getting late. Send the crowds away so they can go to the villages and buy food.\u201d</p>" +
          "<p>The disciples\u2019 suggestion makes sense on the surface. They see a real problem and propose a practical solution: disperse the crowd. But Jesus responds with a command that must have stopped them cold: \u201cThey do not need to go away. You give them something to eat.\u201d</p>" +
          "<p>Think about how impossible that sounded. The disciples hold up five loaves and two fish. John tells us this meager meal came from a boy in the crowd. Five loaves and two fish for thousands of people. The math could not be more lopsided.</p>" +
          "<p>Yet Jesus does not scold them for having so little. He says, \u201cBring them here to me.\u201d That is the turning point. The provision begins when the little we have passes through his hands. Many of us know the feeling of looking at a need and seeing only how inadequate our resources are. Jesus asks us to bring those resources to him and let him do what only he can do.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cCompassion\u201d (<em>splanchnizesthai</em>) is a visceral word in Greek, describing a feeling deep in the gut. Matthew uses it repeatedly for Jesus\u2019 response to human suffering (Matthew 9:36; 15:32; 20:34).</li>" +
          "<li>The phrase \u201cYou give them something to eat\u201d echoes 2 Kings 4:42\u201344, where Elisha\u2019s servant asked how twenty loaves could feed a hundred men, and yet God provided with leftovers.</li>" +
          "<li>John\u2019s mention of the boy\u2019s lunch (John 6:8\u20139) highlights the smallness of the offering, making the miracle even more striking.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The disciples saw the problem and wanted to send people away. Jesus saw the same problem and moved toward it. Where do you tend to \u201csend people away\u201d rather than trusting God to work through your limited resources?</li>" +
          "<li>\u201cBring them here to me.\u201d What is one \u201cfive loaves and two fish\u201d situation in your life where you need to hand what you have to Jesus?</li>" +
          "<li>Jesus acted out of compassion even while grieving John\u2019s death. What does that teach you about how God uses our painful seasons?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>18</sup> He said, Bring them hither to me. <sup>19</sup> And he commanded the multitude to sit down on the grass, and took the five loaves, and the two fishes, and looking up to heaven, he blessed, and brake, and gave the loaves to his disciples, and the disciples to the multitude. <sup>20</sup> And they did all eat, and were filled: and they took up of the fragments that remained twelve baskets full. <sup>21</sup> And they that had eaten were about five thousand men, beside women and children.</p>",
        reference: "Matthew 14:18-21",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus told the disciples to bring the loaves and fish. He directed the people to sit down on the grass, took the five loaves and the two fish, looked up to heaven, gave thanks, and broke the loaves. Then he gave them to the disciples, and the disciples distributed them to the people.</p>" +
          "<p>Everyone ate. Everyone was satisfied. And the disciples picked up twelve full baskets of leftovers. God\u2019s provision went far beyond \u201cbarely enough.\u201d He gave abundantly, with surplus.</p>" +
          "<p>I want you to notice the pattern: Jesus takes, blesses, breaks, and gives. He will repeat this exact sequence at the Last Supper when he takes bread, gives thanks, breaks it, and says, \u201cThis is my body.\u201d The feeding of the five thousand points forward to the cross, where Jesus\u2019 body is broken so that the whole world can be fed with the bread of life.</p>" +
          "<p>The twelve baskets are striking. The disciples started with almost nothing, and they ended with more than they began with. That is how God often works. We offer him our little, and he returns something so abundant that we end up carrying surplus. The surplus may look different from what we expected, but God\u2019s generosity consistently outpaces our calculations.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cTook, blessed, broke, gave\u201d mirrors Jewish table blessings (<em>berakah</em>) and directly anticipates the Eucharistic language of Matthew 26:26 and 1 Corinthians 11:23\u201324.</li>" +
          "<li>Twelve baskets may symbolize the twelve tribes of Israel, indicating that Jesus can fully provide for all God\u2019s people (Matthew 19:28).</li>" +
          "<li>About five thousand men \u201cbesides women and children\u201d suggests a total crowd of fifteen to twenty thousand, making the miracle even more extraordinary.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>God provided enough for everyone and had twelve baskets left over. When you look back over your life, where do you see a pattern of God giving more than enough?</li>" +
          "<li>The pattern of \u201ctake, bless, break, give\u201d appears at the cross too. How does connecting this miracle to Jesus\u2019 sacrifice deepen its meaning for you?</li>" +
          "<li>The disciples ended up distributing the food. Jesus provided the miracle, but he used their hands. Where might God want to use your hands to deliver his provision to others?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, identify one need you face or one way you are being asked to serve that feels bigger than your resources. Bring what you have to Jesus in prayer, trust him to bless and multiply it, and watch what happens.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The disciples saw the problem and wanted to send people away. Jesus saw the same problem and moved toward it. Where do you tend to \u201csend people away\u201d rather than trusting God to work through your limited resources?",
      "\u201cBring them here to me.\u201d What is one \u201cfive loaves and two fish\u201d situation in your life where you need to hand what you have to Jesus?",
      "Jesus acted out of compassion even while grieving John\u2019s death. What does that teach you about how God uses our painful seasons?",
      "God provided enough for everyone and had twelve baskets left over. When you look back over your life, where do you see a pattern of God giving more than enough?",
      "The pattern of \u201ctake, bless, break, give\u201d appears at the cross too. How does connecting this miracle to Jesus\u2019 sacrifice deepen its meaning for you?",
      "The disciples ended up distributing the food. Jesus provided the miracle, but he used their hands. Where might God want to use your hands to deliver his provision to others?",
    ],
  },
  // ==================== LESSON 21 ====================
  {
    id: "41",
    version: 1,
    title: "Walking on Water",
    subtitle: "Keeping Our Eyes on Jesus",
    date: "2027-01-23",
    scheduledDate: "2027-01-23",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 14:22-33",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>This event takes place the same night as the feeding of the five thousand. John\u2019s Gospel tells us the crowd tried to seize Jesus and make him king by force (John 6:15). Jesus dismisses the crowd, sends the disciples ahead by boat, and goes up the mountain alone to pray.</p>" +
          "<p>The disciples are crossing the widest stretch of the Sea of Galilee, roughly eight miles across, heading toward Capernaum on the northwestern shore. Matthew places them \u201cin the middle of the sea\u201d when the storm hits. The fourth watch of the night, between 3:00 and 6:00 a.m., means the disciples have been struggling against wind and waves for most of the night, perhaps eight or nine hours.</p>" +
          "<p>The Sea of Galilee sits 680 feet below sea level in a basin surrounded by hills and the Golan Heights, which rise over 2,000 feet to the east. Roughly 25 miles to the north, Mount Hermon reaches 9,000 feet. Cold air from those heights descends rapidly through the surrounding gorges and collides with the warm, moist air above the water, producing sudden, violent storms that catch even experienced fishermen off guard. Several of the disciples were lifelong fishermen who knew this lake intimately. Their fear tells us this was no routine squall.</p>" +
          "<p>In the Old Testament, God alone commands the sea and treads upon its waves. Job 9:8 says God \u201calone stretched out the heavens and trampled the waves of the sea.\u201d Psalm 77:19 declares, \u201cYour way was through the sea, your path through the great waters.\u201d Psalm 107:28\u201329 describes God calming storms for terrified sailors. When Jesus walks on the water and calms the wind by his presence, the disciples witness the God of Israel acting in person. Their response, \u201cTruly you are the Son of God,\u201d is the strongest confession of Jesus\u2019 identity in Matthew\u2019s Gospel to this point.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>22</sup> And straightway Jesus constrained his disciples to get into a ship, and to go before him unto the other side, while he sent the multitudes away. <sup>23</sup> And when he had sent the multitudes away, he went up into a mountain apart to pray: and when the evening was come, he was there alone. <sup>24</sup> But the ship was now in the midst of the sea, tossed with waves: for the wind was contrary. <sup>25</sup> And in the fourth watch of the night Jesus went unto them, walking on the sea. <sup>26</sup> And when the disciples saw him walking on the sea, they were troubled, saying, It is a spirit; and they cried out for fear. <sup>27</sup> But straightway Jesus spake unto them, saying, Be of good cheer; it is I; be not afraid.</p>",
        reference: "Matthew 14:22-27",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>After feeding the crowd, Jesus makes the disciples get into the boat and go ahead of him to the other side. He goes up the mountain to pray alone. Picture the scene hours later. The disciples are exhausted, soaked, and far from shore. They have been rowing against the wind since evening, and now it is the fourth watch, the darkest hours before dawn.</p>" +
          "<p>Out of the darkness, they see a figure walking toward them on the water. They are terrified and cry out, \u201cIt is a ghost!\u201d But immediately Jesus speaks: \u201cTake heart; it is I. Do not be afraid.\u201d</p>" +
          "<p>Three things stand out to me. First, Jesus sees them struggling even though he is on the mountain and they are in the middle of the lake. Distance does not limit his awareness. Second, he comes to them. They did not call for him. He walks through the storm to reach them. Third, his first words address their fear. Before he calms the wind, he calms their hearts.</p>" +
          "<p>Many of us have experienced long, dark nights of struggle, seasons where we felt as though we were rowing against the wind with no progress and no end in sight. This passage says that Jesus sees, Jesus comes, and Jesus speaks. He enters our storms on his own initiative and meets us where the trouble is.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Jesus\u2019 time alone in prayer models his dependence on the Father and his practice of withdrawing after intense public ministry (Mark 1:35; Luke 5:15\u201316; Luke 6:12).</li>" +
          "<li>The fourth watch follows the Roman system of dividing the night into four watches (6\u20139 p.m., 9 p.m.\u2013midnight, midnight\u20133 a.m., 3\u20136 a.m.).</li>" +
          "<li>\u201cIt is I\u201d (<em>ego eimi</em>) echoes God\u2019s self-revelation to Moses at the burning bush, \u201cI AM\u201d (Exodus 3:14), and anticipates Jesus\u2019 other \u201cI AM\u201d declarations in the Gospels (John 8:58).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The disciples had been struggling all night before Jesus appeared. When have you been in a long season of difficulty, and how did you experience God\u2019s timing?</li>" +
          "<li>Jesus\u2019 first words are \u201cTake heart; it is I. Do not be afraid.\u201d If you could hear him say those words directly into your situation right now, what would change?</li>" +
          "<li>Jesus saw the disciples from the mountain even though they were far away in the dark. How does knowing that Jesus sees your struggle, even when you feel invisible, affect the way you pray?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>28</sup> And Peter answered him and said, Lord, if it be thou, bid me come unto thee on the water. <sup>29</sup> And he said, Come. And when Peter was come down out of the ship, he walked on the water, to go to Jesus. <sup>30</sup> But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me. <sup>31</sup> And immediately Jesus stretched forth his hand, and caught him, and said unto him, O thou of little faith, wherefore didst thou doubt? <sup>32</sup> And when they were come into the ship, the wind ceased. <sup>33</sup> Then they that were in the ship came and worshipped him, saying, Of a truth thou art the Son of God.</p>",
        reference: "Matthew 14:28-33",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Peter says, \u201cLord, if it is you, command me to come to you on the water.\u201d Jesus says one word: \u201cCome.\u201d Peter climbs out of the boat and walks on the water toward Jesus.</p>" +
          "<p>Stop and picture that. A fisherman, in the middle of the night, in a storm, steps over the side of a boat and walks on the surface of a lake. For a few moments, the impossible is happening. Peter is doing what only God does.</p>" +
          "<p>Then Matthew says, \u201cWhen he saw the wind, he was afraid, and beginning to sink he cried out, \u2018Lord, save me!\u2019 Immediately Jesus reached out his hand and caught him. He said, \u2018O you of little faith, why did you doubt?\u2019\u201d</p>" +
          "<p>I want to highlight two things. First, Peter\u2019s faith was real. He got out of the boat. He took a risk that none of the other eleven attempted. His faith was genuine even though it wavered. Second, the moment Peter cried out, Jesus caught him. There was no lecture first, no delay, no \u201cLet\u2019s see if you can swim back on your own.\u201d Jesus reached out immediately.</p>" +
          "<p>When they climbed into the boat, the wind stopped. And the disciples worshiped him, saying, \u201cTruly you are the Son of God.\u201d That confession is the destination the whole story has been building toward. The storm, the fear, the walking, the sinking, the rescue, all of it brings them to see who Jesus really is.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Only Matthew includes the account of Peter walking on the water. Many scholars believe Peter himself was the source of this detail, given to Matthew as an eyewitness (note the repeated use of \u201cimmediately\u201d in this passage, a word more typical of Mark\u2019s Peter-influenced narrative).</li>" +
          "<li>\u201cO you of little faith\u201d (<em>oligopiste</em>) is gentle correction, used elsewhere for disciples who genuinely believe but struggle to trust fully (Matthew 6:30; 8:26; 16:8).</li>" +
          "<li>The disciples\u2019 confession \u201cTruly you are the Son of God\u201d anticipates Peter\u2019s later confession at Caesarea Philippi (Matthew 16:16) and the centurion\u2019s declaration at the cross (Matthew 27:54).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Peter got out of the boat while the other eleven stayed in. What \u201cboat\u201d might God be asking you to step out of, and what holds you back?</li>" +
          "<li>Peter sank when he focused on the wind instead of Jesus. What are the \u201cwinds\u201d that pull your attention away from trusting God, and what helps you refocus?</li>" +
          "<li>The whole episode leads to worship: \u201cTruly you are the Son of God.\u201d When has a difficult experience deepened your understanding of who Jesus is?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, when fear or doubt pulls your eyes away from Jesus, practice Peter\u2019s prayer: \u201cLord, save me!\u201d Then pay attention to how Jesus reaches out. Write down what you notice.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The disciples had been struggling all night before Jesus appeared. When have you been in a long season of difficulty, and how did you experience God\u2019s timing?",
      "Jesus\u2019 first words are \u201cTake heart; it is I. Do not be afraid.\u201d If you could hear him say those words directly into your situation right now, what would change?",
      "Jesus saw the disciples from the mountain even though they were far away in the dark. How does knowing that Jesus sees your struggle, even when you feel invisible, affect the way you pray?",
      "Peter got out of the boat while the other eleven stayed in. What \u201cboat\u201d might God be asking you to step out of, and what holds you back?",
      "Peter sank when he focused on the wind instead of Jesus. What are the \u201cwinds\u201d that pull your attention away from trusting God, and what helps you refocus?",
      "The whole episode leads to worship: \u201cTruly you are the Son of God.\u201d When has a difficult experience deepened your understanding of who Jesus is?",
    ],
  },
  // ==================== LESSON 22 ====================
  {
    id: "42",
    version: 1,
    title: "Who Do You Say That I Am?",
    subtitle: "Peter\u2019s Confession",
    date: "2027-01-30",
    scheduledDate: "2027-01-30",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 16:13-20",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>This passage marks a major turning point in Matthew\u2019s Gospel. Jesus takes his disciples about 25 miles north of the Sea of Galilee to the district of Caesarea Philippi, a two-day journey into a region saturated with pagan worship.</p>" +
          "<p>Caesarea Philippi sat at the base of Mount Hermon, where one of the headwaters of the Jordan River gushed from a spring at the foot of a massive rock cliff more than 100 feet high. Carved into the cliff face were niches that held statues of pagan gods. A large cave at the base of the cliff had been a cult center for the Greek god Pan since the third century BC, and the site was originally called Paneas (modern Banias). Herod the Great built a white marble temple nearby to honor Emperor Augustus, and his son Herod Philip later renamed the area \u201cCaesarea Philippi,\u201d honoring both Caesar and himself.</p>" +
          "<p>So when Jesus stands in this district, surrounded by monuments to Caesar worship and pagan shrines carved into rock, and asks, \u201cWho do people say that the Son of Man is?\u201d the setting is loaded with significance. The disciples report various opinions: John the Baptist, Elijah, Jeremiah, or one of the prophets. Then Jesus makes the question personal: \u201cBut who do you say that I am?\u201d</p>" +
          "<p>Peter answers, \u201cYou are the Christ, the Son of the living God.\u201d Standing in a place that proclaimed Caesar as lord and Pan as god, Peter confesses that Jesus, a carpenter from Nazareth, is the true Messiah and the living God\u2019s own Son. Jesus affirms that this insight did not come from human reasoning but from revelation by the Father. He then declares, \u201cOn this rock I will build my church, and the gates of Hades will not prevail against it.\u201d With the cliff and the cave (which ancients associated with the gates of the underworld) visible in the background, Jesus\u2019 words would have carried vivid, unmistakable force.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>13</sup> When Jesus came into the coasts of Caesarea Philippi, he asked his disciples, saying, Whom do men say that I the Son of man am? <sup>14</sup> And they said, Some say that thou art John the Baptist: some, Elias; and others, Jeremias, or one of the prophets. <sup>15</sup> He saith unto them, But whom say ye that I am? <sup>16</sup> And Simon Peter answered and said, Thou art the Christ, the Son of the living God. <sup>17</sup> And Jesus answered and said unto him, Blessed art thou, Simon Barjona: for flesh and blood hath not revealed it unto thee, but my Father which is in heaven.</p>",
        reference: "Matthew 16:13-17",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus asks two questions. The first is a warm-up: \u201cWho do people say that the Son of Man is?\u201d The answers come easily: John the Baptist, Elijah, Jeremiah, one of the prophets. The public has high regard for Jesus. They see him as someone significant, maybe even a great figure returned from the dead.</p>" +
          "<p>Then Jesus narrows the question: \u201cBut who do you say that I am?\u201d Notice the emphasis. He has heard what the crowds think. Now he wants to know what the twelve believe. Peter speaks: \u201cYou are the Christ, the Son of the living God.\u201d</p>" +
          "<p>\u201cChrist\u201d means \u201canointed one,\u201d the promised King in David\u2019s line whom the prophets said would deliver God\u2019s people and establish an everlasting kingdom (2 Samuel 7:12\u201316; Isaiah 9:6\u20137; Daniel 7:13\u201314). \u201cSon of the living God\u201d goes further still, declaring Jesus\u2019 unique relationship to the Father.</p>" +
          "<p>Jesus responds with a blessing: \u201cBlessed are you, Simon Bar-Jonah! For flesh and blood has not revealed this to you, but my Father who is in heaven.\u201d Peter did not arrive at this confession through cleverness or study alone. God opened his eyes.</p>" +
          "<p>That is still how people come to genuine faith. We can present evidence, share our story, and live with integrity, but the moment when someone truly sees who Jesus is and confesses him as Lord, that is a work of God in the human heart.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cSon of Man\u201d was Jesus\u2019 favorite self-designation, drawn from Daniel 7:13\u201314, where this figure receives authority, glory, and an everlasting kingdom from God.</li>" +
          "<li>The list of guesses (John the Baptist, Elijah, Jeremiah) reflects popular expectations of prophetic figures who would prepare the way for the messianic age (Malachi 4:5; Deuteronomy 18:15).</li>" +
          "<li>\u201cFlesh and blood\u201d is a Semitic idiom meaning ordinary human perception, emphasizing that Peter\u2019s insight came by divine revelation (1 Corinthians 12:3; Galatians 1:16).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>If Jesus asked you today, \u201cWho do you say that I am?\u201d how would you answer, and what experiences or Scriptures have shaped that answer?</li>" +
          "<li>Peter\u2019s confession did not come from human reasoning alone. Can you identify a moment when something about Jesus became clear to you in a way that felt like more than your own thinking?</li>" +
          "<li>The crowd had many opinions about Jesus, all of them partially right but ultimately inadequate. Where do you see people today admiring Jesus without fully recognizing who he is?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>18</sup> And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it. <sup>19</sup> And I will give unto thee the keys of the kingdom of heaven: and whatsoever thou shalt bind on earth shall be bound in heaven: and whatsoever thou shalt loose on earth shall be loosed in heaven. <sup>20</sup> Then charged he his disciples that they should tell no man that he was Jesus the Christ.</p>",
        reference: "Matthew 16:18-20",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus says, \u201cYou are Peter, and on this rock I will build my church, and the gates of Hades will not prevail against it.\u201d The wordplay is powerful. \u201cPeter\u201d (<em>Petros</em>) and \u201crock\u201d (<em>petra</em>) are related words. Jesus is tying Peter\u2019s confession, and Peter\u2019s role in making it, to the foundation of his church.</p>" +
          "<p>Now picture the setting. Behind Jesus stands a massive rock cliff with pagan shrines, a temple to Caesar, and a cave that locals associated with the entrance to the underworld. Against that backdrop, Jesus announces that he will build something on a different rock, the confession that he is the Christ, and that even the \u201cgates of Hades\u201d will not stand against it. His church will outlast every empire and survive every assault, including death itself.</p>" +
          "<p>He then speaks of giving Peter \u201cthe keys of the kingdom of heaven\u201d and the authority to \u201cbind and loose,\u201d language drawn from rabbinic usage for making authoritative decisions about what is permitted and prohibited in the community of faith. This authority is later extended to the wider body of disciples (Matthew 18:18).</p>" +
          "<p>For those of us who sometimes wonder whether the church will survive, whether the faith will endure, whether darkness is winning, this passage is an anchor. Jesus said he would build his church. He staked his own name on its survival. Every empire that has tried to destroy it has eventually fallen, and the church is still here.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The \u201crock\u201d has been interpreted as Peter himself, Peter\u2019s confession, Christ himself, or a combination. The most natural reading connects the rock to Peter\u2019s confessing role and the truth he confessed (Ephesians 2:20; 1 Corinthians 3:11).</li>" +
          "<li>\u201cGates of Hades\u201d refers to the realm of the dead and its power, echoing Isaiah 38:10 and Wisdom of Solomon 16:13. Jesus declares that death will fail to hold his people (1 Corinthians 15:54\u201357).</li>" +
          "<li>\u201cBinding and loosing\u201d were technical terms in Jewish legal discussion for declaring something forbidden or permitted, which Jesus applies to his community\u2019s authority under his lordship.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus promised to build his church against a backdrop of rival powers and pagan worship. Where do you see the church today standing firm against pressures that try to silence or replace it?</li>" +
          "<li>\u201cThe gates of Hades will not prevail against it.\u201d How does that promise encourage you when you feel discouraged about the future of the faith?</li>" +
          "<li>Jesus gave Peter authority and responsibility along with the confession. What responsibility do you carry as someone who confesses Jesus as Lord?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, take time to write out your own confession: \u201cI believe Jesus is ___.\u201d Be specific about what you have come to know about him through your own journey. Then share that confession with one other person.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "If Jesus asked you today, \u201cWho do you say that I am?\u201d how would you answer, and what experiences or Scriptures have shaped that answer?",
      "Peter\u2019s confession did not come from human reasoning alone. Can you identify a moment when something about Jesus became clear to you in a way that felt like more than your own thinking?",
      "The crowd had many opinions about Jesus, all of them partially right but ultimately inadequate. Where do you see people today admiring Jesus without fully recognizing who he is?",
      "Jesus promised to build his church against a backdrop of rival powers and pagan worship. Where do you see the church today standing firm against pressures that try to silence or replace it?",
      "\u201cThe gates of Hades will not prevail against it.\u201d How does that promise encourage you when you feel discouraged about the future of the faith?",
      "Jesus gave Peter authority and responsibility along with the confession. What responsibility do you carry as someone who confesses Jesus as Lord?",
    ],
  },
  // ==================== LESSON 23 ====================
  {
    id: "43",
    version: 1,
    title: "Forgiveness Without Limit",
    subtitle: "The Parable of the Unforgiving Servant",
    date: "2027-02-06",
    scheduledDate: "2027-02-06",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 18:21-35",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>After teaching about church discipline and reconciliation (Matthew 18:15\u201320), Peter asks Jesus a question about the limits of forgiveness: \u201cLord, how many times shall I forgive my brother who sins against me? Up to seven times?\u201d</p>" +
          "<p>Peter\u2019s suggestion of seven was generous by contemporary standards. Rabbinic tradition, reflected later in the Babylonian Talmud (<em>Yoma</em> 86b\u201387a), taught that a person should forgive someone who sinned against them up to three times, based on the pattern in Amos 1\u20132 where God pronounces judgment after \u201cthree transgressions, and for four.\u201d Peter doubled that standard and added one more. He likely expected Jesus to commend his generosity.</p>" +
          "<p>Jesus\u2019 answer obliterates every calculation: \u201cI do not say to you seven times, but seventy-seven times\u201d (or \u201cseventy times seven\u201d). The language deliberately reverses Genesis 4:24, where Lamech, a descendant of Cain, boasted of limitless vengeance: \u201cIf Cain\u2019s revenge is sevenfold, then Lamech\u2019s is seventy-sevenfold.\u201d Jesus replaces limitless retaliation with limitless mercy.</p>" +
          "<p>He then tells a parable about a king who settles accounts with his servants. One servant owes ten thousand talents, an astronomical, deliberately absurd figure. A single talent equaled about 6,000 denarii, and a denarius was a laborer\u2019s daily wage. Ten thousand talents therefore equaled roughly 60 million denarii, or approximately 200,000 years of labor. For context, the entire annual tax revenue of Galilee, Perea, and Idumea combined was about 900 talents. The total annual revenue of the wealthy province of Egypt was reportedly around 12,000 talents. Jesus chose a number that exceeded the income of entire kingdoms to make his point unmistakable: the debt represents something that could never, ever be repaid by human effort.</p>" +
          "<p>The second servant owes one hundred denarii, about four months\u2019 wages for a day laborer, a real but manageable debt. The contrast between the two debts, a ratio of roughly 600,000 to 1, is the engine of the parable. The king\u2019s forgiveness of the first debt represents God\u2019s staggering mercy. The servant\u2019s refusal to forgive the second debt reveals the absurdity and wickedness of withholding mercy after receiving so much.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>21</sup> Then came Peter to him, and said, Lord, how oft shall my brother sin against me, and I forgive him? till seven times? <sup>22</sup> Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven. <sup>23</sup> Therefore is the kingdom of heaven likened unto a certain king, which would take account of his servants. <sup>24</sup> And when he had begun to reckon, one was brought unto him, which owed him ten thousand talents. <sup>25</sup> But forasmuch as he had not to pay, his lord commanded him to be sold, and his wife, and children, and all that he had, and payment to be made. <sup>26</sup> The servant therefore fell down, and worshipped him, saying, Lord, have patience with me, and I will pay thee all. <sup>27</sup> Then the lord of that servant was moved with compassion, and loosed him, and forgave him the debt.</p>",
        reference: "Matthew 18:21-27",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Peter comes to Jesus and asks what probably seemed like a generous question: \u201cHow many times should I forgive? Seven?\u201d Jesus answers, \u201cSeventy-seven times,\u201d a way of saying \u201cstop counting altogether.\u201d</p>" +
          "<p>Then he tells a story. A king decides to settle accounts and discovers that one of his servants owes him ten thousand talents. To put that in perspective, a single day laborer would need to work 200,000 years to earn that amount. The number is intentionally impossible. Jesus wants us to feel how absurd it would be for anyone to pay this back.</p>" +
          "<p>The servant falls on his face and begs, \u201cHave patience with me, and I will repay you everything.\u201d That promise is laughable. He could work a thousand lifetimes and never come close. Yet the king is moved with compassion. He releases the servant and forgives the entire debt. All of it. Gone.</p>" +
          "<p>That is the picture of what God has done for each of us. The debt of our sin against a holy God is something we can never settle through effort, good behavior, or time. And God, moved by his own compassion and made possible through the sacrifice of Christ, cancels it freely. When we receive that forgiveness, we stand in a position no amount of personal achievement could ever have earned.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Ten thousand (<em>myrioi</em>) was the largest named number in Greek, and the talent was the largest unit of currency. Jesus combines the two to create the most extreme figure his language allowed.</li>" +
          "<li>The king\u2019s compassion uses the same Greek word (<em>splanchnistheis</em>) used for Jesus\u2019 compassion throughout the Gospels (Matthew 9:36; 14:14; 15:32), linking the king\u2019s heart to God\u2019s heart.</li>" +
          "<li>The servant\u2019s promise to \u201crepay everything\u201d exposes the self-deception of thinking we can earn our way back to God (Romans 3:23\u201324; Ephesians 2:8\u20139).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus uses an impossibly large debt to picture what God forgives. When you try to grasp the scale of God\u2019s mercy toward you, what comes to mind?</li>" +
          "<li>The servant promised to \u201crepay everything,\u201d which was impossible. Where do you see yourself trying to earn or deserve what God has already given freely?</li>" +
          "<li>The king was \u201cmoved with compassion.\u201d How does it change your prayer life to know that God\u2019s motivation for forgiving you is compassion rather than obligation?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>28</sup> But the same servant went out, and found one of his fellowservants, which owed him an hundred pence: and he laid hands on him, and took him by the throat, saying, Pay me that thou owest. <sup>29</sup> And his fellowservant fell down at his feet, and besought him, saying, Have patience with me, and I will pay thee all. <sup>30</sup> And he would not: but went and cast him into prison, till he should pay the debt. <sup>31</sup> So when his fellowservants saw what was done, they were very sorry, and came and told unto their lord all that was done. <sup>32</sup> Then his lord, after that he had called him, said unto him, O thou wicked servant, I forgave thee all that debt, because thou desiredst me: <sup>33</sup> Shouldest not thou also have had compassion on thy fellowservant, even as I had pity on thee? <sup>34</sup> And his lord was wroth, and delivered him to the tormentors, till he should pay all that was due unto him. <sup>35</sup> So likewise shall my heavenly Father do also unto you, if ye from your hearts forgive not every one his brother their trespasses.</p>",
        reference: "Matthew 18:28-35",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>After being forgiven an unpayable debt, the servant walks out and finds a fellow servant who owes him one hundred denarii, about four months\u2019 wages. He grabs the man by the throat and demands, \u201cPay me what you owe!\u201d The fellow servant falls down and begs for patience, using almost the same words the first servant used before the king.</p>" +
          "<p>But the forgiven servant refuses. He has the man thrown into prison until the debt is paid. When the other servants see what has happened, they are deeply grieved and report it to the king.</p>" +
          "<p>The king summons the servant and says, \u201cYou wicked servant! I forgave you all that debt because you pleaded with me. Should you not also have had mercy on your fellow servant, as I had mercy on you?\u201d In anger, the king hands him over to be punished until he should repay all that was owed.</p>" +
          "<p>Jesus closes with a sobering sentence: \u201cSo also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.\u201d</p>" +
          "<p>Forgiveness is hard. Some of us carry wounds that run very deep, betrayals that have shaped years of our lives. Jesus does not minimize that pain. But he asks us to hold our real injuries next to the 600,000-to-1 ratio in this story and let the comparison do its work. The debt God has canceled for us dwarfs any debt another person owes us. Refusing to forgive, after receiving that kind of mercy, puts us in a kind of self-imposed prison.</p>" +
          "<p>Forgiving someone does not mean saying the wrong was acceptable. Forgiving means releasing the person and the debt into God\u2019s hands, trusting him with the justice, and choosing freedom over bitterness.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The ratio of ten thousand talents to one hundred denarii (roughly 600,000 to 1) is the key to the parable\u2019s force. Jesus wants us to feel the absurd disproportion between what God forgives and what we withhold.</li>" +
          "<li>\u201cForgive from your heart\u201d (<em>apo t\u014dn kardi\u014dn</em>) indicates that Jesus is looking for genuine internal release, not merely external compliance or polite avoidance (Matthew 5:21\u201324).</li>" +
          "<li>The parable reinforces the petition in the Lord\u2019s Prayer: \u201cForgive us our debts, as we also have forgiven our debtors\u201d (Matthew 6:12), which Jesus expanded with a warning in Matthew 6:14\u201315.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The forgiven servant could not see himself clearly. He had received everything and still demanded from others. Where might we be blind to the same pattern in our own lives?</li>" +
          "<li>Forgiving someone does not mean pretending it did not hurt. With that in mind, what is one small step you could take toward releasing a grudge or hurt that you have been carrying?</li>" +
          "<li>Jesus says forgiveness should come \u201cfrom your heart.\u201d What is the difference between saying \u201cI forgive you\u201d and actually releasing the debt internally? What helps you move from one to the other?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, ask God to bring to mind one person you need to forgive more fully. Spend time remembering the scale of what God has forgiven you. Then take one concrete step toward releasing that person, whether through prayer, a conversation, or simply choosing to stop rehearsing the offense.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus uses an impossibly large debt to picture what God forgives. When you try to grasp the scale of God\u2019s mercy toward you, what comes to mind?",
      "The servant promised to \u201crepay everything,\u201d which was impossible. Where do you see yourself trying to earn or deserve what God has already given freely?",
      "The king was \u201cmoved with compassion.\u201d How does it change your prayer life to know that God\u2019s motivation for forgiving you is compassion rather than obligation?",
      "The forgiven servant could not see himself clearly. He had received everything and still demanded from others. Where might we be blind to the same pattern in our own lives?",
      "Forgiving someone does not mean pretending it did not hurt. With that in mind, what is one small step you could take toward releasing a grudge or hurt that you have been carrying?",
      "Jesus says forgiveness should come \u201cfrom your heart.\u201d What is the difference between saying \u201cI forgive you\u201d and actually releasing the debt internally? What helps you move from one to the other?",
    ],
  },
  // ==================== LESSON 24 ====================
  {
    id: "44",
    version: 1,
    title: "The Greatest Commandment",
    subtitle: "Love God and Love Your Neighbor",
    date: "2027-02-13",
    scheduledDate: "2027-02-13",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 22:34-40",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>This exchange takes place during the final week of Jesus\u2019 life, in the temple courts in Jerusalem. The religious leaders have been testing him with a series of hostile questions designed to trap him publicly. The Sadducees have just tried and failed with a question about the resurrection (Matthew 22:23\u201333). Now the Pharisees regroup and send one of their own, an expert in the law, to try again.</p>" +
          "<p>The question \u201cWhich is the greatest commandment in the Law?\u201d was a well-known debate topic among the rabbis. Later tradition counted 613 commandments in the Torah: 248 positive commands and 365 prohibitions. Scholars debated which were \u201cheavy\u201d (more important) and which were \u201clight\u201d (less important), and whether one commandment could serve as a summary of all the rest.</p>" +
          "<p>Jesus answers by quoting two Old Testament passages. First, Deuteronomy 6:5, from the <em>Shema</em>, the confession that devout Jews recited twice daily: \u201cHear, O Israel: The LORD our God, the LORD is one. You shall love the LORD your God with all your heart and with all your soul and with all your might.\u201d The <em>Shema</em> was the bedrock of Jewish faith, the first Scripture a child learned and the last words a dying person aimed to speak. Second, Jesus quotes Leviticus 19:18: \u201cYou shall love your neighbor as yourself.\u201d He then makes the remarkable claim that \u201call the Law and the Prophets hang on these two commandments,\u201d meaning every specific command in the entire Hebrew Bible is an expression of love for God or love for neighbor.</p>" +
          "<p>By linking these two commands and placing them above all others, Jesus cuts through the complexity of legal debate and offers a clear compass for life. His answer was so compelling that Matthew says, \u201cNo one was able to answer him a word, nor from that day did anyone dare to ask him any more questions\u201d (Matthew 22:46).</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>34</sup> But when the Pharisees had heard that he had put the Sadducees to silence, they were gathered together. <sup>35</sup> Then one of them, which was a lawyer, asked him a question, tempting him, and saying, <sup>36</sup> Master, which is the great commandment in the law? <sup>37</sup> Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. <sup>38</sup> This is the first and great commandment.</p>",
        reference: "Matthew 22:34-38",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>A Pharisee who is an expert in the law asks Jesus, \u201cTeacher, which is the great commandment in the Law?\u201d Jesus answers by quoting the <em>Shema</em> from Deuteronomy 6:5: \u201cYou shall love the Lord your God with all your heart and with all your soul and with all your mind.\u201d He adds, \u201cThis is the great and first commandment.\u201d</p>" +
          "<p>Notice the word \u201call.\u201d All your heart, all your soul, all your mind. These three terms overlap and together cover the entire inner life: desires, emotions, will, thoughts, reasoning. Jesus is saying that God deserves and desires our whole selves, held back from nothing.</p>" +
          "<p>That might sound overwhelming. \u201cAll\u201d can feel like a demand we will inevitably fail to meet. But consider the nature of the relationship. This commandment comes from a God who has already shown extravagant love: he created us, pursued us, forgave us, and gave his Son for us. Loving God with everything we have is a response to the love he has already poured out. A child does not love their parent because they calculated the cost and decided it was worth it. The love grows naturally from the relationship.</p>" +
          "<p>In practice, loving God with all our heart, soul, and mind means that every area of life, our relationships, our work, our rest, our thought life, our decisions, is lived with an awareness of him and a desire to honor him. That takes a lifetime to grow into, and God is patient with the process.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The <em>Shema</em> (Deuteronomy 6:4\u20135) was recited morning and evening by observant Jews and was inscribed in the <em>mezuzah</em> on doorposts and in the <em>tefillin</em> (phylacteries) worn during prayer (Deuteronomy 6:6\u20139).</li>" +
          "<li>\u201cHeart, soul, mind\u201d in Hebrew thought covers the will, the life-force or appetites, and the intellect, essentially the whole person (Mark 12:30 adds \u201cstrength\u201d).</li>" +
          "<li>Jesus\u2019 focus on love as the heart of the law echoes the prophetic tradition that prioritized covenant faithfulness over mere external compliance (Hosea 6:6; Micah 6:8; 1 Samuel 15:22).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>\u201cAll your heart, all your soul, all your mind.\u201d Which of those areas do you find easiest to give to God, and which one do you tend to hold back?</li>" +
          "<li>Loving God is a response to his love for us. When you think about what God has done in your life, what stirs gratitude and love in you most deeply?</li>" +
          "<li>If you took this commandment seriously for one week, what would change in how you spend your time, what you think about, or how you make decisions?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>39</sup> And the second is like unto it, Thou shalt love thy neighbour as thyself. <sup>40</sup> On these two commandments hang all the law and the prophets.</p>",
        reference: "Matthew 22:39-40",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus adds a second commandment, quoting Leviticus 19:18: \u201cYou shall love your neighbor as yourself.\u201d He says it is \u201clike\u201d the first, meaning it is of the same kind and closely connected. You cannot truly love God and neglect the people around you. And you cannot sustainably love people well if you are disconnected from God.</p>" +
          "<p>\u201cAs yourself\u201d gives us a built-in measure. We naturally look after our own comfort, safety, reputation, and well-being. Jesus says, \u201cNow extend that same instinct outward. Treat others with the care and attention you naturally give yourself.\u201d</p>" +
          "<p>Then comes one of the most sweeping statements in all of Scripture: \u201cOn these two commandments depend all the Law and the Prophets.\u201d Every command in the Old Testament, from the ten commandments to the detailed regulations of Leviticus, hangs on these two hooks. If you pull them out, the whole structure falls. If you keep them, everything else finds its proper place.</p>" +
          "<p>For those of us who sometimes feel overwhelmed by the complexity of the Christian life, this passage is a gift. When you are unsure what the right thing to do is, run it through this filter: Does this choice express love for God? Does it express love for my neighbor? That two-question test can guide decisions in almost any situation.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Leviticus 19:18 originally addressed treatment of fellow Israelites, but Jesus\u2019 broader teaching extends \u201cneighbor\u201d to include enemies, outsiders, and anyone in need (Luke 10:25\u201337; Matthew 5:43\u201348).</li>" +
          "<li>Paul echoes Jesus\u2019 summary: \u201cThe whole law is fulfilled in one word: \u2018You shall love your neighbor as yourself\u2019\u201d (Galatians 5:14; Romans 13:8\u201310).</li>" +
          "<li>James calls Leviticus 19:18 \u201cthe royal law\u201d (James 2:8), giving it supreme status among ethical instructions.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Who are the \u201cneighbors\u201d God has placed closest to you right now? What would loving one of them \u201cas yourself\u201d look like in a specific, practical way this week?</li>" +
          "<li>Jesus ties love for God and love for neighbor tightly together. When have you found that growing closer to God naturally changed the way you treated someone?</li>" +
          "<li>If \u201call the Law and the Prophets\u201d hang on love, how does that simplify your understanding of what God expects of you? Does that simplicity feel freeing, challenging, or both?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, each morning, ask two questions: \u201cHow will I love God today?\u201d and \u201cHow will I love my neighbor today?\u201d At the end of the week, reflect on what shifted when you let these two commandments guide your days.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "\u201cAll your heart, all your soul, all your mind.\u201d Which of those areas do you find easiest to give to God, and which one do you tend to hold back?",
      "Loving God is a response to his love for us. When you think about what God has done in your life, what stirs gratitude and love in you most deeply?",
      "If you took this commandment seriously for one week, what would change in how you spend your time, what you think about, or how you make decisions?",
      "Who are the \u201cneighbors\u201d God has placed closest to you right now? What would loving one of them \u201cas yourself\u201d look like in a specific, practical way this week?",
      "Jesus ties love for God and love for neighbor tightly together. When have you found that growing closer to God naturally changed the way you treated someone?",
      "If \u201call the Law and the Prophets\u201d hang on love, how does that simplify your understanding of what God expects of you? Does that simplicity feel freeing, challenging, or both?",
    ],
  },
  // ==================== LESSON 25 ====================
  {
    id: "45",
    version: 1,
    title: "Let the Children Come",
    subtitle: "The Value of Childlike Faith",
    date: "2027-02-20",
    scheduledDate: "2027-02-20",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "Matthew 19:13-15",
    },
    blocks: [
      {
        type: "context",
        content:
          "<p>This short but powerful episode occurs as Jesus is traveling through the region of Judea beyond the Jordan, on his way toward Jerusalem for the final time. People bring their children to Jesus so that he might lay his hands on them and pray. The disciples rebuke them, and Jesus responds sharply: \u201cLet the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.\u201d</p>" +
          "<p>In first-century Jewish culture, the laying on of hands was a well-established practice associated with blessing, commissioning, and prayer. The tradition extended back to the patriarchs. Genesis 48:14 records Jacob crossing his hands to bless Ephraim and Manasseh, Joseph\u2019s sons. Parents regularly brought their children to respected rabbis and elders for a spoken blessing, especially on holy days and special occasions.</p>" +
          "<p>Children in the ancient world, however, held very low social status. They had no legal rights, no economic value until they were old enough to work, and no voice in community decisions. In both Jewish and Greco-Roman society, children were among the least powerful members of the household. The disciples\u2019 reaction reflects this cultural assumption: Jesus is an important teacher, and his time should not be spent on children who cannot understand his message or respond in faith.</p>" +
          "<p>Jesus overturns that assumption. He says the kingdom of heaven <em>belongs</em> to \u201csuch as these,\u201d meaning those who approach God with the trusting dependence that characterizes a child. Throughout Matthew, Jesus uses children as living illustrations of what kingdom life looks like: humility (Matthew 18:1\u20134), dependence, and openness to receiving what they cannot earn.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>13</sup> Then were there brought unto him little children, that he should put his hands on them, and pray: and the disciples rebuked them. <sup>14</sup> But Jesus said, Suffer little children, and forbid them not, to come unto me: for of such is the kingdom of heaven. <sup>15</sup> And he laid his hands on them, and departed thence.</p>",
        reference: "Matthew 19:13-15",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>People bring their children to Jesus for prayer and blessing. The disciples try to turn them away. And Jesus says, \u201cLet the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.\u201d</p>" +
          "<p>Think about the contrast. The disciples are acting as gatekeepers, deciding who deserves access to Jesus. They assume the children are too young, too insignificant, too unable to understand. Jesus says the opposite: these children are a picture of exactly what the kingdom requires.</p>" +
          "<p>What is it about a child that Jesus values so highly? A young child depends entirely on others. A child does not come with a r\u00e9sum\u00e9 or a list of accomplishments. A child receives gifts without the illusion of having earned them. A child trusts a loving parent without elaborate reasoning. That kind of open, humble, dependent trust is precisely what God asks of all of us.</p>" +
          "<p>Matthew tells us that Jesus placed his hands on the children and prayed over them before he moved on. He made time for the very people his closest followers had dismissed. He touched the ones the culture considered least important.</p>" +
          "<p>For anyone who has ever felt too small, too old, too broken, or too insignificant to approach God, this passage is an invitation. Jesus does not turn away the humble. He reaches toward them.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Luke\u2019s parallel (Luke 18:15) uses the word <em>brephe</em> (\u201cinfants\u201d), indicating that some of the children were very young, possibly still being carried.</li>" +
          "<li>The laying on of hands in Jewish practice was both a prayer and a pronouncement of blessing, an act that communicated spiritual benefit through physical touch (Genesis 48:14\u201320; Numbers 27:18\u201323).</li>" +
          "<li>This passage immediately follows Jesus\u2019 teaching on marriage and divorce (Matthew 19:1\u201312), creating a literary frame where the status of the vulnerable (women, children) is elevated against cultural norms.</li>" +
          "<li>\u201cDo not hinder them\u201d uses a strong Greek verb (<em>k\u014dly\u014d</em>) that carries the force of \u201cstop preventing\u201d or \u201cstop forbidding,\u201d suggesting the disciples were actively blocking access.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The disciples tried to keep children away from Jesus. Where do you see people today, even unintentionally, putting barriers between others and God?</li>" +
          "<li>Jesus says the kingdom belongs to those who come like children. What is one quality of childlike faith that you had more of when you were younger and would like to recover?</li>" +
          "<li>Jesus took time for people the rest of the world overlooked. Who in your life might feel overlooked, and how could you make time for them this week?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup> At the same time came the disciples unto Jesus, saying, Who is the greatest in the kingdom of heaven? <sup>2</sup> And Jesus called a little child unto him, and set him in the midst of them, <sup>3</sup> And said, Verily I say unto you, Except ye be converted, and become as little children, ye shall not enter into the kingdom of heaven. <sup>4</sup> Whosoever therefore shall humble himself as this little child, the same is greatest in the kingdom of heaven. <sup>5</sup> And whoso shall receive one such little child in my name receiveth me.</p>",
        reference: "Matthew 18:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Earlier in Matthew 18, the disciples ask Jesus directly, \u201cWho is the greatest in the kingdom of heaven?\u201d Jesus calls a child, places the child in their midst, and says, \u201cUnless you turn and become like children, you will never enter the kingdom of heaven. Whoever humbles himself like this child is the greatest in the kingdom of heaven.\u201d</p>" +
          "<p>The disciples are asking about rank, position, and status. Jesus answers by pointing to a child, someone with no rank, no position, and no status. In their culture, a child was the last person anyone would have identified as \u201cthe greatest.\u201d</p>" +
          "<p>Humility in this context means knowing your need and being willing to receive. A child does not pretend to be self-sufficient. A child does not calculate what they deserve. A child comes with open hands. Jesus says that posture, not achievement or influence, defines greatness in his kingdom.</p>" +
          "<p>For many of us, especially those who have spent a lifetime being capable and independent, this teaching cuts deep. Aging, illness, or limitations may have placed us in a position where we depend on others more than ever before. Jesus says that dependence, when offered to God in trust, is a form of greatness. The very thing the world calls weakness, God calls a doorway.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The word \u201cturn\u201d (<em>streph\u014d</em>) implies a complete reorientation of values, similar to repentance. The disciples must reverse their understanding of greatness.</li>" +
          "<li>In Greco-Roman culture, greatness was measured by power, patronage, and public honor. Jesus\u2019 redefinition was radical and counter-cultural.</li>" +
          "<li>Matthew 18:5 adds, \u201cWhoever receives one such child in my name receives me,\u201d linking hospitality toward the vulnerable with receiving Christ himself (Matthew 25:40).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The disciples wanted to know who was greatest. Jesus pointed to a child. How does that reshape the way you think about success and significance?</li>" +
          "<li>Dependence can feel humbling, especially for those who have always been strong and capable. How might God be using a season of dependence to draw you closer to him?</li>" +
          "<li>\u201cWhoever receives one such child in my name receives me.\u201d What would change in your daily interactions if you saw every vulnerable person as an opportunity to welcome Jesus himself?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, practice one act of childlike faith: ask God for something you need without trying to manage the outcome yourself. Simply bring the request with open hands and trust him with the answer.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The disciples tried to keep children away from Jesus. Where do you see people today, even unintentionally, putting barriers between others and God?",
      "Jesus says the kingdom belongs to those who come like children. What is one quality of childlike faith that you had more of when you were younger and would like to recover?",
      "Jesus took time for people the rest of the world overlooked. Who in your life might feel overlooked, and how could you make time for them this week?",
      "The disciples wanted to know who was greatest. Jesus pointed to a child. How does that reshape the way you think about success and significance?",
      "Dependence can feel humbling, especially for those who have always been strong and capable. How might God be using a season of dependence to draw you closer to him?",
      "\u201cWhoever receives one such child in my name receives me.\u201d What would change in your daily interactions if you saw every vulnerable person as an opportunity to welcome Jesus himself?",
    ],
  },

  // ── Lesson 26 ──
  {
    id: "46",
    version: 1,
    title: "The Workers in the Vineyard",
    subtitle: "God\u2019s Generous Grace",
    date: "2027-02-27",
    scheduledDate: "2027-02-27",
    isPublished: true,
    author: "Ministry Team",
    scripture: { primary: "Matthew 20:1\u201316" },
    blocks: [
      {
        type: "context",
        content:
          "<p>This parable comes immediately after Peter\u2019s question in Matthew 19:27: \u201cWe have left everything to follow you. What then will there be for us?\u201d Jesus assures the disciples of great reward, but then tells this story to reframe their expectations about how God distributes his generosity.</p>" +
          "<p>The setting reflects the daily reality of first-century Palestinian agriculture. Large numbers of peasant farmers had lost their ancestral land through debt, much of it incurred by heavy Roman taxation. These displaced workers gathered each morning in the marketplace of towns like Sepphoris and Tiberias, waiting for landowners to hire them for the day. Archaeological work has confirmed the existence of these employment hubs in Galilee. A day laborer who was not hired went home without food for his family.</p>" +
          "<p>The standard daily wage was one denarius, a Roman silver coin equivalent to a soldier\u2019s daily pay and enough to feed a small family for a day. It was considered fair but modest. Jesus describes a landowner who hires workers at dawn (about 6:00 a.m.), then again at 9:00 a.m., noon, 3:00 p.m., and finally at 5:00 p.m., the \u201celeventh hour,\u201d just sixty minutes before quitting time.</p>" +
          "<p>The urgency of the late hires fits the agricultural context. Grapes had to be harvested within a narrow window before they began to ferment on the vine. Roman tax records from Wadi Murabba\u2019at and Masada confirm that vineyards were high-value holdings, and delaying the harvest meant financial loss. The late hiring would not have seemed unusual. What shocked the audience was the payment: every worker, from dawn to dusk, received the same denarius.</p>" +
          "<p>Vineyards were a familiar symbol for Israel in Jewish Scripture (Isaiah 5:1\u20137; Psalm 80:8\u201316; Jeremiah 12:10). The landowner who goes out repeatedly to bring workers into his vineyard reflects a God who keeps extending invitations to his people, no matter the hour.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup>For the kingdom of heaven is like unto a man that is an householder, which went out early in the morning to hire labourers into his vineyard. <sup>2</sup>And when he had agreed with the labourers for a penny a day, he sent them into his vineyard. <sup>3</sup>And he went out about the third hour, and saw others standing idle in the marketplace, <sup>4</sup>And said unto them; Go ye also into the vineyard, and whatsoever is right I will give you. And they went their way. <sup>5</sup>Again he went out about the sixth and ninth hour, and did likewise. <sup>6</sup>And about the eleventh hour he went out, and found others standing idle, and saith unto them, Why stand ye here all the day idle? <sup>7</sup>They say unto him, Because no man hath hired us. He saith unto them, Go ye also into the vineyard; and whatsoever is right, that shall ye receive.</p>",
        reference: "Matthew 20:1\u20137",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>The landowner goes out at dawn and hires a crew, agreeing on one denarius for the day. Then he returns at nine o\u2019clock, at noon, at three o\u2019clock, and finally at five o\u2019clock, finding workers still standing in the marketplace, unemployed.</p>" +
          "<p>He asks the last group, \u201cWhy have you been standing here all day long doing nothing?\u201d They answer, \u201cBecause no one has hired us.\u201d That answer matters. These workers were available. They were willing. They simply had not been chosen. In a day-labor economy, being passed over meant going home empty-handed while your family went hungry.</p>" +
          "<p>The landowner says, \u201cYou also go into my vineyard.\u201d No negotiation about wages. No lecture about showing up earlier. Just an invitation.</p>" +
          "<p>I find a powerful pastoral truth here. Some of us came to faith early and have walked with God for decades. Others came later, perhaps much later. Some may feel they have wasted years or missed their chance. This parable says that God keeps going back to the marketplace. He keeps inviting. The five o\u2019clock workers were not less wanted. They simply had not yet been called. And when the call came, it was the same generous invitation as the one offered at dawn.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>The marketplace (<em>agora</em>) served as the economic and social hub of a town. Day laborers gathered there each morning, and the anxiety of not being hired was a daily reality (Tobit 4:14).</li>" +
          "<li>\u201cWhatever is right I will give you\u201d (Matthew 20:4) to the later workers leaves the amount unspecified, requiring trust in the landowner\u2019s fairness.</li>" +
          "<li>The landowner going out repeatedly mirrors God\u2019s persistent pursuit of Israel through the prophets and now through Jesus (Matthew 21:33\u201341; 23:37).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The five o\u2019clock workers waited all day for someone to hire them. Have you ever felt \u201cpassed over\u201d by God or by life? How does this parable speak to that experience?</li>" +
          "<li>God keeps going back to the marketplace. Who in your life might be waiting for an invitation, and how could you be part of extending it?</li>" +
          "<li>The later workers had to trust the landowner without a guaranteed wage. Where is God asking you to trust him without knowing all the details in advance?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>8</sup>So when even was come, the lord of the vineyard saith unto his steward, Call the labourers, and give them their hire, beginning from the last unto the first. <sup>9</sup>And when they came that were hired about the eleventh hour, they received every man a penny. <sup>10</sup>But when the first came, they supposed that they should have received more; and they likewise received every man a penny. <sup>11</sup>And when they had received it, they murmured against the goodman of the house, <sup>12</sup>Saying, These last have wrought but one hour, and thou hast made them equal unto us, which have borne the burden and heat of the day. <sup>13</sup>But he answered one of them, and said, Friend, I do thee no wrong: didst not thou agree with me for a penny? <sup>14</sup>Take that thine is, and go thy way: I will give unto this last, even as unto thee. <sup>15</sup>Is it not lawful for me to do what I will with mine own? Is thine eye evil, because I am good? <sup>16</sup>So the last shall be first, and the first last: for many be called, but few chosen.</p>",
        reference: "Matthew 20:8\u201316",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>At the end of the day, the landowner tells his manager to pay the workers, starting with the last hired. The five o\u2019clock workers each receive one denarius, a full day\u2019s wage for a single hour of work. When the dawn crew sees this, they expect more. But they also receive one denarius, exactly what was promised.</p>" +
          "<p>They grumble: \u201cThese last worked only one hour, and you have made them equal to us who have borne the burden of the day and the scorching heat.\u201d The landowner responds, \u201cFriend, I am doing you no wrong. Did you not agree with me for a denarius? Take what belongs to you and go. I choose to give to this last worker as I give to you. Am I not allowed to do what I choose with what belongs to me? Or do you begrudge my generosity?\u201d</p>" +
          "<p>This is where the parable challenges us most directly. The dawn workers were not cheated. They received exactly what was fair. Their complaint was that someone else received more than they deserved. The problem was comparison.</p>" +
          "<p>Jesus ends with a line that brackets the entire passage: \u201cSo the last will be first, and the first last.\u201d In God\u2019s economy, grace levels the field. A lifelong believer and a deathbed convert receive the same gift: full acceptance, full forgiveness, full welcome. If that feels unfair, it may reveal that we are calculating our standing with God based on merit rather than receiving his grace with gratitude.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Paying the last workers first was a deliberate narrative strategy by Jesus. The dawn workers needed to see what the latecomers received in order for the tension to surface.</li>" +
          "<li>\u201cDo you begrudge my generosity?\u201d is literally in Greek, \u201cIs your eye evil because I am good?\u201d connecting envy (the \u201cevil eye\u201d) with an inability to celebrate grace given to others (Matthew 6:22\u201323).</li>" +
          "<li>The parable does not address degrees of heavenly reward (which other passages discuss) but emphasizes that entry into the kingdom is entirely by grace, available fully and equally to all who respond to God\u2019s call.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>When you see someone receive grace they did not \u201cearn,\u201d how do you respond? What does your response reveal about your understanding of God\u2019s generosity?</li>" +
          "<li>The dawn workers compared themselves to the latecomers and lost their joy. Where does comparison steal your gratitude in your own walk with God?</li>" +
          "<li>\u201cThe last will be first, and the first last.\u201d How does this principle reshape your understanding of who matters in God\u2019s kingdom?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, when you catch yourself comparing your effort, your faithfulness, or your suffering to someone else\u2019s, pause and remember: God\u2019s grace to others does not diminish his grace to you. Thank him for one specific gift he has given you that you did nothing to earn.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The five o\u2019clock workers waited all day for someone to hire them. Have you ever felt \u201cpassed over\u201d by God or by life? How does this parable speak to that experience?",
      "God keeps going back to the marketplace. Who in your life might be waiting for an invitation, and how could you be part of extending it?",
      "The later workers had to trust the landowner without a guaranteed wage. Where is God asking you to trust him without knowing all the details in advance?",
      "When you see someone receive grace they did not \u201cearn,\u201d how do you respond? What does your response reveal about your understanding of God\u2019s generosity?",
      "The dawn workers compared themselves to the latecomers and lost their joy. Where does comparison steal your gratitude in your own walk with God?",
      "\u201cThe last will be first, and the first last.\u201d How does this principle reshape your understanding of who matters in God\u2019s kingdom?",
    ],
  },

  // ── Lesson 27 ──
  {
    id: "47",
    version: 1,
    title: "The Parable of the Talents",
    subtitle: "Faithful with What God Gives",
    date: "2027-03-06",
    scheduledDate: "2027-03-06",
    isPublished: true,
    author: "Ministry Team",
    scripture: { primary: "Matthew 25:14\u201330" },
    blocks: [
      {
        type: "context",
        content:
          "<p>This parable appears in Jesus\u2019 final block of teaching before his arrest and crucifixion. Matthew 24\u201325 is known as the Olivet Discourse, delivered on the Mount of Olives overlooking Jerusalem. The central theme is readiness for the master\u2019s return and faithful stewardship during his absence.</p>" +
          "<p>A \u201ctalent\u201d was an enormous unit of currency. One talent equaled approximately 6,000 denarii, and a single denarius was the standard daily wage for a laborer. One talent therefore represented roughly sixteen to twenty years of wages for an ordinary worker. The servant entrusted with five talents received the equivalent of about one hundred years\u2019 wages, an astronomical fortune. Even the servant who received one talent held a sum that no common person would see in a lifetime.</p>" +
          "<p>In the ancient world, wealthy landowners frequently entrusted their estates to trusted servants or slaves when traveling abroad, especially for long journeys. The master in the parable distributes his property \u201cto each according to his ability\u201d (Matthew 25:15), indicating that the assignments are personalized and appropriate.</p>" +
          "<p>Burying treasure in the ground was a common method of safeguarding valuables, as Jesus noted in the parable of the hidden treasure (Matthew 13:44). In the absence of modern banking, digging a hole was considered the safest option. The Mishnah (<em>Bava Metzia</em> 3:10) discusses the legal obligations surrounding buried deposits. The third servant\u2019s choice to bury the talent would not have seemed foolish to the audience. What is striking is the master\u2019s reaction: burying the money was safe, but safe was insufficient. The master expected active investment and fruitful return.</p>" +
          "<p>The modern English word \u201ctalent,\u201d meaning a natural ability or gift, actually derives from this parable. Over centuries, Jesus\u2019 story so thoroughly shaped Western thinking that the monetary term became a metaphor for any God-given capacity.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>14</sup>For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. <sup>15</sup>And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey. <sup>16</sup>Then he that had received the five talents went and traded with the same, and made them other five talents. <sup>17</sup>And likewise he that had received two, he also gained other two. <sup>18</sup>But he that had received one went and digged in the earth, and hid his lord's money.</p>",
        reference: "Matthew 25:14\u201318",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>A man going on a journey calls his servants and entrusts his property to them. To one he gives five talents, to another two, to another one, each according to his ability. Then he leaves.</p>" +
          "<p>Three things stand out in this setup. First, the amounts are staggering. Even one talent is a fortune. God has given each of us far more than we tend to recognize: life, breath, relationships, faith, experiences, skills, time. We are wealthy in ways we often take for granted.</p>" +
          "<p>Second, the distribution is personal. \u201cEach according to his ability.\u201d God does not hand everyone the same assignment. He knows our capacity and entrusts accordingly. Comparing our portion to someone else\u2019s misses the point. The question is whether we are faithful with what we have been given.</p>" +
          "<p>Third, the master leaves. He does not stand over them supervising every decision. He trusts them and then goes away for a long time. We live in that in-between period right now, between Jesus\u2019 ascension and his return. He has given us his resources and his mission, and he trusts us to invest them wisely while we wait for him.</p>" +
          "<p>The first two servants go immediately to work and double what they received. The third digs a hole and buries his talent in the ground. He plays it safe. He avoids risk. He protects what he has. And as we will see, that is precisely the problem.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>A talent weighed approximately 75 pounds (33 kg) as a unit of weight. As currency, its value depended on whether it was silver or gold. A silver talent equaled 6,000 denarii.</li>" +
          "<li>\u201cAccording to his ability\u201d (<em>kata t\u0113n idian dynamin</em>) emphasizes that God\u2019s expectations are proportional to our capacity, making the evaluation fair and personalized.</li>" +
          "<li>The \u201clong time\u201d of the master\u2019s absence (Matthew 25:19) connects the parable to the early church\u2019s experience of waiting for Christ\u2019s return and the temptation to grow passive.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>If you made a list of everything God has entrusted to you, gifts, relationships, experiences, faith, time, what would be on it? Which items do you tend to overlook?</li>" +
          "<li>The master gave \u201ceach according to his ability.\u201d How does knowing that God\u2019s expectations match your capacity change the way you think about what he has asked of you?</li>" +
          "<li>The first two servants acted immediately. The third buried his talent. What tends to keep you from using what God has given you, fear, laziness, uncertainty, or something else?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>19</sup>After a long time the lord of those servants cometh, and reckoneth with them. <sup>20</sup>And so he that had received five talents came and brought other five talents, saying, Lord, thou deliveredst unto me five talents: behold, I have gained beside them five talents more. <sup>21</sup>His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. <sup>22</sup>He also that had received two talents came and said, Lord, thou deliveredst unto me two talents: behold, I have gained two other talents beside them. <sup>23</sup>His lord said unto him, Well done, good and faithful servant; thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. <sup>24</sup>Then he which had received the one talent came and said, Lord, I knew thee that thou art an hard man, reaping where thou hast not sown, and gathering where thou hast not strawed: <sup>25</sup>And I was afraid, and went and hid thy talent in the earth: lo, there thou hast that is thine. <sup>26</sup>His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: <sup>27</sup>Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury. <sup>28</sup>Take therefore the talent from him, and give it unto him which hath ten talents. <sup>29</sup>For unto every one that hath shall be given, and he shall have abundance: but from him that hath not shall be taken away even that which he hath. <sup>30</sup>And cast ye the unprofitable servant into outer darkness: there shall be weeping and gnashing of teeth.</p>",
        reference: "Matthew 25:19\u201330",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>After a long time, the master returns and settles accounts. The five-talent servant presents ten talents. The two-talent servant presents four. The master says exactly the same thing to both: \u201cWell done, good and faithful servant. You have been faithful over a little; I will set you over much. Enter into the joy of your master.\u201d</p>" +
          "<p>Notice: the reward is identical even though the amounts differ. The master measures faithfulness, not volume. Whether you produce ten talents or four, what matters is that you invested what you were given. That should encourage anyone who feels their contribution is small. God does not compare your results to someone else\u2019s. He looks at your faithfulness relative to what he entrusted to you.</p>" +
          "<p>Then the one-talent servant comes forward. He says, \u201cMaster, I knew you to be a hard man, reaping where you did not sow, and gathering where you scattered no seed. So I was afraid, and I went and hid your talent in the ground.\u201d</p>" +
          "<p>His excuse reveals his problem. He had a distorted picture of the master. He saw God as harsh, demanding, and impossible to please. That fear paralyzed him. Instead of risking imperfect effort, he chose guaranteed inaction. The master calls him \u201cwicked and slothful\u201d and takes the talent away.</p>" +
          "<p>The lesson for us is sobering and freeing at the same time. God would rather we try and stumble than hide and do nothing. He is looking for willing hearts, not flawless performance. Fear of failure is one of the greatest enemies of faithfulness.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cEnter into the joy of your master\u201d suggests a shared celebration, an intimate participation in the master\u2019s own delight. Reward in the kingdom involves deeper relationship, not merely material blessing.</li>" +
          "<li>The third servant\u2019s description of the master does not match the master\u2019s actual behavior in the parable, where he is generous and trusting. The servant\u2019s fear distorts his perception of God.</li>" +
          "<li>\u201cTo everyone who has, more will be given\u201d (Matthew 25:29) states a principle of stewardship: faithful use of what we have leads to greater capacity and greater opportunity.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The master said the same words to both faithful servants, regardless of the amount they produced. How does that truth affect you if you have ever felt your contribution was too small to matter?</li>" +
          "<li>The third servant was driven by fear. Where in your life does fear of failure or fear of God\u2019s disapproval keep you from stepping out in faith?</li>" +
          "<li>\u201cEnter into the joy of your master.\u201d What do you imagine that moment will be like, and how does anticipating it motivate you today?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, identify one \u201ctalent\u201d God has given you that you have been sitting on, an ability, a relationship, a word you need to speak, an act of service you have been postponing. Take one step to invest it, trusting that God values faithfulness over perfection.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "If you made a list of everything God has entrusted to you, gifts, relationships, experiences, faith, time, what would be on it? Which items do you tend to overlook?",
      "The master gave \u201ceach according to his ability.\u201d How does knowing that God\u2019s expectations match your capacity change the way you think about what he has asked of you?",
      "The first two servants acted immediately. The third buried his talent. What tends to keep you from using what God has given you, fear, laziness, uncertainty, or something else?",
      "The master said the same words to both faithful servants, regardless of the amount they produced. How does that truth affect you if you have ever felt your contribution was too small to matter?",
      "The third servant was driven by fear. Where in your life does fear of failure or fear of God\u2019s disapproval keep you from stepping out in faith?",
      "\u201cEnter into the joy of your master.\u201d What do you imagine that moment will be like, and how does anticipating it motivate you today?",
    ],
  },

  // ── Lesson 28 ──
  {
    id: "48",
    version: 1,
    title: "The Trial and Crucifixion of Jesus",
    subtitle: "The King Who Gave His Life",
    date: "2027-03-13",
    scheduledDate: "2027-03-13",
    isPublished: true,
    author: "Ministry Team",
    scripture: { primary: "Matthew 26:57\u201368; 27:11\u201354" },
    blocks: [
      {
        type: "context",
        content:
          "<p>The events of Jesus\u2019 final night and morning unfolded in a rapid, chaotic sequence. After his arrest in Gethsemane, Jesus was taken first to Annas, a former high priest, and then to Caiaphas, the reigning high priest, whose home served as the meeting place for an emergency session of the Sanhedrin, the supreme Jewish council of seventy-one members.</p>" +
          "<p>This trial was riddled with procedural violations by the Sanhedrin\u2019s own rules. Jewish law required capital cases to be tried during the daytime, in the official meeting hall (the Hall of Hewn Stone in the temple), and never on the eve of a Sabbath or festival. A guilty verdict could not be rendered on the same day as the trial; a night had to pass to allow for reconsideration. Witnesses for the defense were to be actively sought. None of these requirements were met in Jesus\u2019 case. The chief priests sought false testimony, and when the witnesses contradicted each other, Caiaphas took matters into his own hands by demanding that Jesus answer directly: \u201cTell us if you are the Christ, the Son of God.\u201d Jesus replied, \u201cYou have said so. But I tell you, from now on you will see the Son of Man seated at the right hand of Power and coming on the clouds of heaven\u201d (Matthew 26:63\u201364). Caiaphas tore his robes and declared, \u201cHe has uttered blasphemy!\u201d The council condemned him as deserving death.</p>" +
          "<p>Because Rome had stripped the Sanhedrin of the authority to carry out capital punishment, the religious leaders brought Jesus to Pontius Pilate, the Roman prefect of Judea since approximately AD 26. Before Pilate, the charge shifted from blasphemy (a religious offense Rome would not care about) to sedition: Jesus claimed to be \u201cKing of the Jews,\u201d a direct challenge to Caesar\u2019s authority. Ancient sources describe Pilate as cruel, corrupt, and contemptuous of his Jewish subjects, yet he recognized that the Sanhedrin had handed Jesus over out of envy. He attempted to release Jesus through the Passover custom of freeing a prisoner, but the crowd, stirred up by the chief priests, demanded Barabbas instead and shouted for Jesus to be crucified.</p>" +
          "<p>Crucifixion was the Roman Empire\u2019s most feared form of execution, reserved for slaves, rebels, and the worst criminals. Roman citizens were legally exempt from it. The process typically began with scourging, a savage beating with a leather whip embedded with metal and bone that could expose muscle and even bone. The victim was then forced to carry the crossbeam to the execution site, where iron nails were driven through the wrists and feet. Death came slowly, usually by asphyxiation over hours or even days, as the victim\u2019s ability to push upward and draw breath gradually failed. The Roman orator Cicero called crucifixion \u201cthe most cruel and most terrifying punishment.\u201d It was designed to publicly humiliate and terrorize.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>57</sup>And they that had laid hold on Jesus led him away to Caiaphas the high priest, where the scribes and the elders were assembled. <sup>58</sup>But Peter followed him afar off unto the high priest's palace, and went in, and sat with the servants, to see the end. <sup>59</sup>Now the chief priests, and elders, and all the council, sought false witness against Jesus, to put him to death; <sup>60</sup>But found none: yea, though many false witnesses came, yet found they none. At the last came two false witnesses, <sup>61</sup>And said, This fellow said, I am able to destroy the temple of God, and to build it in three days. <sup>62</sup>And the high priest arose, and said unto him, Answerest thou nothing? what is it which these witness against thee? <sup>63</sup>But Jesus held his peace. And the high priest answered and said unto him, I adjure thee by the living God, that thou tell us whether thou be the Christ, the Son of God. <sup>64</sup>Jesus saith unto him, Thou hast said: nevertheless I say unto you, Hereafter shall ye see the Son of man sitting on the right hand of power, and coming in the clouds of heaven. <sup>65</sup>Then the high priest rent his clothes, saying, He hath spoken blasphemy; what further need have we of witnesses? behold, now ye have heard his blasphemy. <sup>66</sup>What think ye? They answered and said, He is guilty of death. <sup>67</sup>Then did they spit in his face, and buffeted him; and others smote him with the palms of their hands, <sup>68</sup>Saying, Prophesy unto us, thou Christ, Who is he that smote thee?</p>",
        reference: "Matthew 26:57\u201368",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>After his arrest, Jesus is brought before Caiaphas and the assembled Sanhedrin. Matthew tells us that the chief priests and the whole council \u201cwere seeking false testimony against Jesus that they might put him to death\u201d (Matthew 26:59). Notice the order: the verdict was decided before the trial began. They were looking for evidence to justify a conclusion they had already reached.</p>" +
          "<p>Witnesses came forward, but their testimonies contradicted each other. Finally, the high priest stood up and said, \u201cI adjure you by the living God, tell us if you are the Christ, the Son of God.\u201d Under oath, Jesus answered. He quoted Daniel 7:13, declaring that they would see \u201cthe Son of Man seated at the right hand of Power and coming on the clouds of heaven.\u201d</p>" +
          "<p>That answer sealed his fate. Caiaphas tore his robes, a dramatic gesture of outrage, and declared it blasphemy. The council agreed: he deserved death. Then they spat in his face and struck him with their fists.</p>" +
          "<p>I want you to feel the weight of this scene. The Son of God stands in a rigged courtroom, surrounded by men who have already decided to kill him. He could have called legions of angels (Matthew 26:53). He could have spoken a word and silenced every voice. Instead, he endured the injustice, the spitting, and the blows. He chose to absorb the violence rather than retaliate, because this path led to our redemption.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Caiaphas served as high priest from approximately AD 18\u201336. In 1990, archaeologists discovered a limestone ossuary (bone box) bearing the inscription \u201cJoseph, son of Caiaphas\u201d in a burial cave south of Jerusalem, confirming his historicity.</li>" +
          "<li>Tearing one\u2019s garments was a prescribed response to hearing blasphemy (Mishnah, <em>Sanhedrin</em> 7:5). Ironically, the high priest was specifically forbidden from tearing his robes (Leviticus 21:10), making Caiaphas\u2019 act a violation of the very law he claimed to defend.</li>" +
          "<li>Jesus\u2019 reference to Daniel 7:13 was unmistakable. The \u201cSon of Man coming on the clouds\u201d was a divine figure who receives an everlasting kingdom directly from God. The Sanhedrin understood the claim perfectly.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus was condemned for telling the truth about himself. When has standing by the truth cost you something, and how did you handle it?</li>" +
          "<li>Jesus remained silent before false accusers and absorbed injustice without retaliating. What does his response teach you about how to handle unfair treatment?</li>" +
          "<li>The religious leaders had already decided to reject Jesus before the trial began. Where do you see people today making up their minds about God before honestly examining the evidence?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>27</sup>Then the soldiers of the governor took Jesus into the common hall, and gathered unto him the whole band of soldiers. <sup>28</sup>And they stripped him, and put on him a scarlet robe. <sup>29</sup>And when they had platted a crown of thorns, they put it upon his head, and a reed in his right hand: and they bowed the knee before him, and mocked him, saying, Hail, King of the Jews! <sup>30</sup>And they spit upon him, and took the reed, and smote him on the head. <sup>31</sup>And after that they had mocked him, they took the robe off from him, and put his own raiment on him, and led him away to crucify him. <sup>32</sup>And as they came out, they found a man of Cyrene, Simon by name: him they compelled to bear his cross. <sup>33</sup>And when they were come unto a place called Golgotha, that is to say, a place of a skull, <sup>34</sup>They gave him vinegar to drink mingled with gall: and when he had tasted thereof, he would not drink. <sup>35</sup>And they crucified him, and parted his garments, casting lots: that it might be fulfilled which was spoken by the prophet, They parted my garments among them, and upon my vesture did they cast lots. <sup>36</sup>And sitting down they watched him there; <sup>37</sup>And set up over his head his accusation written, THIS IS JESUS THE KING OF THE JEWS. <sup>38</sup>Then were there two thieves crucified with him, one on the right hand, and another on the left. <sup>39</sup>And they that passed by reviled him, wagging their heads, <sup>40</sup>And saying, Thou that destroyest the temple, and buildest it in three days, save thyself. If thou be the Son of God, come down from the cross. <sup>41</sup>Likewise also the chief priests mocking him, with the scribes and elders, said, <sup>42</sup>He saved others; himself he cannot save. If he be the King of Israel, let him now come down from the cross, and we will believe him. <sup>43</sup>He trusted in God; let him deliver him now, if he will have him: for he said, I am the Son of God. <sup>44</sup>The thieves also, which were crucified with him, cast the same in his teeth. <sup>45</sup>Now from the sixth hour there was darkness over all the land unto the ninth hour. <sup>46</sup>And about the ninth hour Jesus cried with a loud voice, saying, Eli, Eli, lama sabachthani? that is to say, My God, my God, why hast thou forsaken me? <sup>47</sup>Some of them that stood there, when they heard that, said, This man calleth for Elias. <sup>48</sup>And straightway one of them ran, and took a spunge, and filled it with vinegar, and put it on a reed, and gave him to drink. <sup>49</sup>The rest said, Let be, let us see whether Elias will come to save him. <sup>50</sup>Jesus, when he had cried again with a loud voice, yielded up the ghost. <sup>51</sup>And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did quake, and the rocks rent; <sup>52</sup>And the graves were opened; and many bodies of the saints which slept arose, <sup>53</sup>And came out of the graves after his resurrection, and went into the holy city, and appeared unto many. <sup>54</sup>Now when the centurion, and they that were with him, watching Jesus, saw the earthquake, and those things that were done, they feared greatly, saying, Truly this was the Son of God.</p>",
        reference: "Matthew 27:27\u201354",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>After Pilate sentenced Jesus, the Roman soldiers stripped him, dressed him in a scarlet robe, pressed a crown of thorns onto his head, and mocked him: \u201cHail, King of the Jews!\u201d They struck him, spat on him, and then led him out to be crucified.</p>" +
          "<p>Too weakened from the scourging to carry the crossbeam, Jesus was assisted by a man named Simon of Cyrene, a North African city, who was compelled by the soldiers to carry it. At Golgotha, \u201cthe Place of a Skull,\u201d they nailed Jesus to the cross and raised it between two criminals.</p>" +
          "<p>For three hours, from noon until three o\u2019clock, darkness covered the land. At about three o\u2019clock, Jesus cried out in Aramaic, \u201cEli, Eli, lema sabachthani?\u201d which means, \u201cMy God, my God, why have you forsaken me?\u201d Those words come from Psalm 22:1, a psalm that begins in anguish but ends in triumph and praise. On the cross, Jesus entered the full experience of separation from the Father as he bore the weight of human sin. That cry reveals the true cost of our forgiveness.</p>" +
          "<p>Then Jesus cried out again with a loud voice and yielded up his spirit. At that moment, Matthew records three extraordinary signs. The curtain of the temple was torn in two from top to bottom. The earth shook. Tombs were opened.</p>" +
          "<p>The tearing of the temple curtain carried enormous significance. This thick, heavy veil separated the Holy of Holies, the place of God\u2019s presence, from the rest of the temple. Only the high priest could pass through it, and only once a year on the Day of Atonement. When that curtain tore from top to bottom, it signaled that the barrier between God and humanity had been removed through Jesus\u2019 sacrifice. The way into God\u2019s presence was now open for everyone.</p>" +
          "<p>A Roman centurion, watching everything unfold, made a stunning confession: \u201cTruly this was the Son of God!\u201d The very words the Jewish leaders condemned as blasphemy now come from the lips of a pagan soldier standing at the foot of the cross.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Scourging (<em>verberatio</em>) used a whip called a <em>flagellum</em> with leather strips tipped with metal or bone. It was so severe that victims sometimes died from the beating alone.</li>" +
          "<li>The darkness from noon to 3:00 p.m. echoes prophetic imagery of divine judgment (Amos 8:9\u201310; Joel 2:31) and the plague of darkness over Egypt (Exodus 10:21\u201323).</li>" +
          "<li>\u201cYielded up his spirit\u201d (<em>aph\u0113ken to pneuma</em>) is unique to Matthew and emphasizes that Jesus\u2019 death was a voluntary act, a deliberate giving, consistent with John 10:18: \u201cNo one takes it from me, but I lay it down of my own accord.\u201d</li>" +
          "<li>The centurion\u2019s confession, \u201cTruly this was the Son of God,\u201d forms a bookend with the opening of Matthew\u2019s Gospel, where Jesus is identified as \u201cImmanuel, God with us\u201d (Matthew 1:23).</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus cried out, \u201cMy God, my God, why have you forsaken me?\u201d What does it mean to you that Jesus entered the deepest human experience of abandonment so that you would never have to be truly alone?</li>" +
          "<li>The temple curtain tore from top to bottom, opening the way into God\u2019s presence. How does knowing you have direct, unhindered access to God change the way you pray or approach him?</li>" +
          "<li>The centurion, a man who had just carried out the crucifixion, confessed Jesus as the Son of God. What does his transformation in that moment tell you about the power of the cross to change even the hardest heart?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>This week, spend a few quiet minutes reflecting on what Jesus endured on the cross for you personally. If you are comfortable, write him a letter of gratitude. Then carry one truth from the cross into your daily life: the barrier is gone, and you are welcome in God\u2019s presence at any moment.</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus was condemned for telling the truth about himself. When has standing by the truth cost you something, and how did you handle it?",
      "Jesus remained silent before false accusers and absorbed injustice without retaliating. What does his response teach you about how to handle unfair treatment?",
      "The religious leaders had already decided to reject Jesus before the trial began. Where do you see people today making up their minds about God before honestly examining the evidence?",
      "Jesus cried out, \u201cMy God, my God, why have you forsaken me?\u201d What does it mean to you that Jesus entered the deepest human experience of abandonment so that you would never have to be truly alone?",
      "The temple curtain tore from top to bottom, opening the way into God\u2019s presence. How does knowing you have direct, unhindered access to God change the way you pray or approach him?",
      "The centurion, a man who had just carried out the crucifixion, confessed Jesus as the Son of God. What does his transformation in that moment tell you about the power of the cross to change even the hardest heart?",
    ],
  },

  // ── Lesson 29 ──
  {
    id: "49",
    version: 1,
    title: "He Is Risen",
    subtitle: "The Resurrection Changes Everything",
    date: "2027-03-20",
    scheduledDate: "2027-03-20",
    isPublished: true,
    author: "Ministry Team",
    scripture: { primary: "Matthew 28:1\u201315" },
    blocks: [
      {
        type: "context",
        content:
          "<p>After Jesus\u2019 death on Friday, Joseph of Arimathea, a wealthy member of the Sanhedrin who was secretly a disciple, asked Pilate for the body. He wrapped it in a clean linen cloth and placed it in his own new tomb, which had been cut from rock. A large stone was rolled across the entrance, and Mary Magdalene and the other Mary watched where the body was laid (Matthew 27:57\u201361).</p>" +
          "<p>The next day, the chief priests and Pharisees went to Pilate with an unusual request. They remembered that Jesus had predicted he would rise after three days, so they asked for a guard to be posted at the tomb to prevent the disciples from stealing the body and claiming a resurrection (Matthew 27:62\u201366). Pilate granted the request, and the tomb was sealed with an official Roman seal and placed under military watch. Every precaution the authorities could take, they took. Ironically, these measures would become some of the strongest evidence for the resurrection: the enemies of Jesus themselves certified that the tomb was sealed and guarded, making a hoax nearly impossible to carry out or conceal.</p>" +
          "<p>Early on Sunday morning, \u201cafter the Sabbath, as the first day of the week began to dawn,\u201d the two Marys went to the tomb. They had prepared spices to complete the burial process that the Sabbath had interrupted (Luke 24:1). They expected to find a sealed tomb, a heavy stone, and guards. They came to care for a dead body.</p>" +
          "<p>What they found instead shattered every expectation. A great earthquake shook the ground. An angel descended from heaven, rolled back the stone, and sat on it. His appearance was \u201clike lightning, and his clothing white as snow.\u201d The guards trembled and \u201cbecame like dead men.\u201d The angel spoke to the women: \u201cDo not be afraid, for I know that you seek Jesus who was crucified. He is not here, for he has risen, as he said. Come, see the place where he lay.\u201d</p>" +
          "<p>The empty tomb is the hinge of the Christian faith. The apostle Paul would later write, \u201cIf Christ has not been raised, your faith is futile and you are still in your sins\u201d (1 Corinthians 15:17). Everything stands or falls with this event. And the opponents of the early church, though they tried many explanations, never produced the body. The tomb remained empty.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>1</sup>In the end of the sabbath, as it began to dawn toward the first day of the week, came Mary Magdalene and the other Mary to see the sepulchre. <sup>2</sup>And, behold, there was a great earthquake: for the angel of the Lord descended from heaven, and came and rolled back the stone from the door, and sat upon it. <sup>3</sup>His countenance was like lightning, and his raiment white as snow: <sup>4</sup>And for fear of him the keepers did shake, and became as dead men. <sup>5</sup>And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. <sup>6</sup>He is not here: for he is risen, as he said. Come, see the place where the Lord lay. <sup>7</sup>And go quickly, and tell his disciples that he is risen from the dead; and, behold, he goeth before you into Galilee; there shall ye see him: lo, I have told you.</p>",
        reference: "Matthew 28:1\u20137",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>The women come to the tomb early on Sunday morning expecting grief and the smell of death. What they encounter instead is an earthquake, an angel blazing with light, and an empty tomb.</p>" +
          "<p>The angel\u2019s first words are, \u201cDo not be afraid.\u201d Those words echo throughout the Bible whenever God breaks into human experience. Fear is the natural response to encountering the divine. But the angel follows with the most important announcement in human history: \u201cHe is not here, for he has risen, as he said.\u201d</p>" +
          "<p>I want you to hold on to those last three words: \u201cas he said.\u201d Jesus predicted his death and resurrection three separate times in Matthew\u2019s Gospel (Matthew 16:21; 17:22\u201323; 20:18\u201319). Each time, the disciples could not comprehend it. Now the angel points back to those predictions and says, \u201cHe told you this would happen. And here it is.\u201d The resurrection confirms that every word Jesus spoke carries divine authority. If he kept this promise, the most impossible one, then every other promise he made is equally trustworthy.</p>" +
          "<p>The angel invites the women to see the place where Jesus had lain and then sends them with a message: \u201cGo quickly and tell his disciples that he has risen from the dead, and behold, he is going before you to Galilee; there you will see him.\u201d The first witnesses of the resurrection are women, people whose testimony was not accepted in Jewish courts of that era. God chose the overlooked to carry the greatest news the world has ever heard.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Jewish burial custom required the body to be washed, anointed with spices, and wrapped in linen. The Sabbath began at sundown Friday, interrupting this process. The women returned Sunday at the earliest opportunity.</li>" +
          "<li>The stone covering a wealthy person\u2019s tomb was typically a large disk-shaped rock weighing several hundred pounds, rolled along a groove cut into the rock face. It could not be easily moved by a small group.</li>" +
          "<li>Women were not accepted as legal witnesses in first-century Jewish courts (Mishnah, <em>Shevu\u2019ot</em> 4:1). That the Gospel writers name women as the first witnesses is a mark of historical honesty; if the story were invented, male witnesses would have been chosen.</li>" +
          "<li>The earthquake at the resurrection parallels the earthquake at the crucifixion (Matthew 27:51), framing Jesus\u2019 death and rising as cosmic events that shook creation.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>The angel said, \u201cHe is risen, as he said.\u201d Which promises of Jesus do you most need to trust right now, knowing that the one who kept the promise of the resurrection keeps all his promises?</li>" +
          "<li>The women came expecting death and found life. When has God surprised you by doing something completely different from what you expected?</li>" +
          "<li>God chose women, whose testimony the culture dismissed, as the first witnesses. What does that tell you about who God chooses to carry his message and how he views those the world overlooks?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>8</sup>And they departed quickly from the sepulchre with fear and great joy; and did run to bring his disciples word. <sup>9</sup>And as they went to tell his disciples, behold, Jesus met them, saying, All hail. And they came and held him by the feet, and worshipped him. <sup>10</sup>Then said Jesus unto them, Be not afraid: go tell my brethren that they go into Galilee, and there shall they see me.</p>" +
          "<p><sup>69</sup>Now Peter sat without in the palace: and a damsel came unto him, saying, Thou also wast with Jesus of Galilee. <sup>70</sup>But he denied before them all, saying, I know not what thou sayest. <sup>71</sup>And when he was gone out into the porch, another maid saw him, and said unto them that were there, This fellow was also with Jesus of Nazareth. <sup>72</sup>And again he denied with an oath, I do not know the man. <sup>73</sup>And after a while came unto him they that stood by, and said to Peter, Surely thou also art one of them; for thy speech bewrayeth thee. <sup>74</sup>Then began he to curse and to swear, saying, I know not the man. And immediately the cock crew. <sup>75</sup>And Peter remembered the word of Jesus, which said unto him, Before the cock crow, thou shalt deny me thrice. And he went out, and wept bitterly.</p>",
        reference: "Matthew 28:8\u201310; 26:69\u201375",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>As the women run from the tomb, Jesus himself meets them on the road. He greets them warmly, and when they fall at his feet in worship, he says, \u201cDo not be afraid. Go and tell my brothers to go to Galilee, and there they will see me.\u201d</p>" +
          "<p>I want you to sit with that phrase: \u201cmy brothers.\u201d The last time we saw these men, they had all fled into the night (Matthew 26:56). Peter, the boldest of them, denied three times that he even knew Jesus, swearing and cursing until a rooster crowed and he went out and wept bitterly (Matthew 26:69\u201375). Judas had betrayed him. The rest simply vanished. By any normal reckoning, these men had forfeited the right to be called anything by Jesus, let alone \u201cbrothers.\u201d</p>" +
          "<p>Yet the first message the risen Christ sends is directed to them. He does not say, \u201cGo and tell those cowards.\u201d He does not say, \u201cGo and tell them they need to earn their way back.\u201d He says, \u201cTell my brothers.\u201d In one word he restores the relationship that their failure had shattered. That is what the resurrection makes possible. Because Jesus conquered sin and death on the cross, he now stands on the other side of the grave with the authority to forgive completely and to begin again with anyone who comes to him.</p>" +
          "<p>Peter is the living proof of this. The man who denied Jesus beside a charcoal fire would later be restored beside another charcoal fire on the shore of Galilee (John 21:9\u201317). The man who crumbled under a servant girl\u2019s question would stand before thousands at Pentecost and preach with boldness that shook Jerusalem (Acts 2:14\u201341). The resurrection did not erase Peter\u2019s past. It transformed his future. The same failure that could have defined him forever became part of the testimony of God\u2019s grace.</p>" +
          "<p>That pattern is available to everyone in this room. Whatever you carry, guilt over past choices, regret over broken relationships, shame over things said or left unsaid, the risen Jesus meets you the same way he met those frightened disciples. He calls you family. He invites you forward. The resurrection means that the worst chapter of your story does not have to be the last one.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>Peter\u2019s denial and restoration form one of the most important character arcs in the Gospels. Matthew 26:75 says Peter \u201cwent out and wept bitterly,\u201d and John 21:15\u201317 records Jesus asking Peter three times, \u201cDo you love me?\u201d one question for each denial, restoring him fully to his calling.</li>" +
          "<li>\u201cMy brothers\u201d (<em>adelphoi</em>) is the first time in Matthew that the risen Jesus uses this familial term for the disciples. Earlier, Jesus said, \u201cWhoever does the will of my Father in heaven is my brother and sister and mother\u201d (Matthew 12:50). After the resurrection, the disciples are drawn into that family anew.</li>" +
          "<li>The pattern of failure-to-restoration runs throughout Scripture: Moses the murderer became Israel\u2019s deliverer. David the adulterer was called \u201ca man after God\u2019s own heart.\u201d Paul the persecutor became the greatest missionary in church history. The resurrection power of God specializes in transformed lives.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>Jesus called the disciples \u201cmy brothers\u201d after they had abandoned him. If Jesus spoke that kind of word over your worst failure, how would it change the way you carry that memory?</li>" +
          "<li>Peter\u2019s denial did not disqualify him from service; it became part of his testimony. How has God used a failure or painful season in your life to shape you into someone who can encourage others?</li>" +
          "<li>The resurrection means that no chapter of our story is final except the one God writes last. Where in your life do you most need to believe that transformation is still possible?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>The resurrection is the foundation everything else rests on. This week, take a few minutes each day to say, \u201cJesus is alive, and he is with me.\u201d Let that truth settle into the places where you carry fear, grief, or uncertainty. How does living in the light of the resurrection change the way you face each day?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "The angel said, \u201cHe is risen, as he said.\u201d Which promises of Jesus do you most need to trust right now, knowing that the one who kept the promise of the resurrection keeps all his promises?",
      "The women came expecting death and found life. When has God surprised you by doing something completely different from what you expected?",
      "God chose women, whose testimony the culture dismissed, as the first witnesses. What does that tell you about who God chooses to carry his message and how he views those the world overlooks?",
      "Jesus called the disciples \u201cmy brothers\u201d after they had abandoned him. If Jesus spoke that kind of word over your worst failure, how would it change the way you carry that memory?",
      "Peter\u2019s denial did not disqualify him from service; it became part of his testimony. How has God used a failure or painful season in your life to shape you into someone who can encourage others?",
      "The resurrection means that no chapter of our story is final except the one God writes last. Where in your life do you most need to believe that transformation is still possible?",
    ],
  },

  // ── Lesson 30 ──
  {
    id: "50",
    version: 1,
    title: "The Great Commission",
    subtitle: "Go and Make Disciples",
    date: "2027-03-27",
    scheduledDate: "2027-03-27",
    isPublished: true,
    author: "Ministry Team",
    scripture: { primary: "Matthew 28:16\u201320" },
    blocks: [
      {
        type: "context",
        content:
          "<p>Matthew\u2019s Gospel ends where it began, with the identity and authority of Jesus. The angel announced him as \u201cGod with us\u201d (Matthew 1:23). Now the risen Jesus declares, \u201cAll authority in heaven and on earth has been given to me,\u201d and promises, \u201cI am with you always, to the end of the age.\u201d</p>" +
          "<p>The eleven remaining disciples travel to Galilee, to the mountain where Jesus had directed them. Galilee was considered the backwaters by the cultural elite in Jerusalem, a region of mixed populations and lower social prestige. That Jesus chose Galilee rather than Jerusalem for this commissioning moment underscores a pattern that runs through Matthew: the kingdom of God advances from the margins, through unlikely people, in unexpected places.</p>" +
          "<p>Matthew records an honest and striking detail: \u201cWhen they saw him, they worshiped him; but some doubted\u201d (Matthew 28:17). The greatest missionary movement in human history began with a group that included doubters. Jesus does not wait for perfect faith before giving the assignment. He commissions imperfect, uncertain people and promises to be with them.</p>" +
          "<p>The commission itself revolves around one central verb: \u201cmake disciples\u201d (<em>math\u0113teusate</em>). The other verbs, \u201cgoing,\u201d \u201cbaptizing,\u201d and \u201cteaching,\u201d describe how disciple-making happens. The scope is breathtaking: \u201call nations\u201d (<em>panta ta ethn\u0113</em>). Throughout Matthew, the gospel moves from Israel outward. Now the risen Christ removes every boundary. The promise to Abraham that \u201call peoples on earth will be blessed through you\u201d (Genesis 12:3) and Isaiah\u2019s vision of the light reaching \u201cthe ends of the earth\u201d (Isaiah 49:6) find their fulfillment in these closing words.</p>" +
          "<p>The closing promise, \u201cI am with you always, to the end of the age,\u201d echoes God\u2019s presence with Moses (Exodus 3:12), Joshua (Joshua 1:5), and the prophets (Jeremiah 1:8). Jesus claims the same abiding, sustaining presence that only God can offer, completing the circle from \u201cImmanuel\u201d in Matthew 1 to \u201cI am with you\u201d in Matthew 28.</p>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>16</sup>Then the eleven disciples went away into Galilee, into a mountain where Jesus had appointed them. <sup>17</sup>And when they saw him, they worshipped him: but some doubted. <sup>18</sup>And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth.</p>",
        reference: "Matthew 28:16\u201318",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>The disciples go to Galilee and see the risen Jesus. Matthew tells us they worshiped, \u201cbut some doubted.\u201d I appreciate Matthew\u2019s honesty. He does not airbrush the scene. These are real people with real questions, standing in front of the resurrected Lord and still wrestling with uncertainty. Jesus does not dismiss them. He steps toward them and speaks.</p>" +
          "<p>His first words are a claim of cosmic authority: \u201cAll authority in heaven and on earth has been given to me.\u201d This echoes Daniel 7:13\u201314, where the Son of Man approaches the throne of God and receives \u201cauthority, glory, and sovereign power.\u201d Every nation, language, and people will serve him, and his dominion will never be destroyed.</p>" +
          "<p>That claim matters for everything that follows. Jesus is about to give his followers an assignment that will take them into hostile territory, across cultural barriers, and into centuries of opposition. The assignment would be impossible if it rested on their own strength. But it rests on his authority. Every act of obedience, every prayer, every conversation about faith is backed by the risen King who holds all authority in every realm.</p>" +
          "<p>For anyone who feels inadequate, under-equipped, or uncertain, this verse is the answer. The commission does not begin with \u201cYou are strong enough.\u201d It begins with \u201cI have all authority.\u201d Our sufficiency comes from him.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cAll authority\u201d (<em>pasa exousia</em>) covers every domain: spiritual, political, natural. The risen Christ stands above every power that exists or will exist (Ephesians 1:20\u201323; Philippians 2:9\u201311).</li>" +
          "<li>\u201cHas been given to me\u201d uses the passive voice, indicating that the Father bestowed this authority upon the Son, consistent with Daniel 7:13\u201314 and Philippians 2:9.</li>" +
          "<li>The mountain setting echoes earlier mountain scenes in Matthew: the temptation (4:8), the Sermon on the Mount (5:1), the transfiguration (17:1). Mountains in Matthew are places of revelation and commissioning.</li>" +
          "<li>\u201cSome doubted\u201d may refer to honest uncertainty about what the resurrection meant or hesitation about what was being asked of them, a relatable and humanizing detail.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>\u201cSome doubted\u201d even while they worshiped. Have you experienced moments where faith and doubt coexisted? How did God meet you in that tension?</li>" +
          "<li>Jesus says all authority belongs to him. What situation in your life would look different if you lived as though that were fully true?</li>" +
          "<li>The commission rests on Jesus\u2019 authority, not on the disciples\u2019 qualifications. How does that reshape the way you think about what God might ask of you?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "<p><sup>19</sup>Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: <sup>20</sup>Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.</p>",
        reference: "Matthew 28:19\u201320",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "<p>Jesus says, \u201cGo therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe everything I have commanded you.\u201d</p>" +
          "<p>The heart of the commission is \u201cmake disciples.\u201d A disciple is a learner, a follower, someone who patterns their life after their teacher. Jesus spent three years modeling what discipleship looks like: prayer, obedience, compassion, sacrifice, trust. Now he tells his followers to reproduce that pattern in every nation on earth.</p>" +
          "<p>Three activities describe how disciple-making happens. First, \u201cgoing,\u201d which means as you go about your life, wherever you are, in every situation. Second, \u201cbaptizing,\u201d which means welcoming new believers into the community of faith through a public declaration of their allegiance to the Father, Son, and Holy Spirit. Third, \u201cteaching them to observe everything I have commanded you,\u201d which means passing along the full body of Jesus\u2019 teaching and helping people live it out.</p>" +
          "<p>That final instruction brings us full circle. Matthew\u2019s entire Gospel has been recording \u201ceverything I have commanded you,\u201d from the Sermon on the Mount to the parables to the teachings on forgiveness, faith, and love. The Great Commission is a call to keep that message alive in every generation.</p>" +
          "<p>And then the closing promise: \u201cAnd surely I am with you always, to the very end of the age.\u201d The Gospel began with the name Immanuel, \u201cGod with us.\u201d It ends with the same assurance in Jesus\u2019 own voice. We are never sent alone. Wherever the mission takes us, he goes with us.</p>",
        projectable: true,
      },
      {
        type: "teacher_notes",
        content:
          "<ul>" +
          "<li>\u201cMake disciples\u201d (<em>math\u0113teusate</em>) is the main imperative verb. \u201cGoing,\u201d \u201cbaptizing,\u201d and \u201cteaching\u201d are participial phrases that describe how the disciple-making happens.</li>" +
          "<li>\u201cAll nations\u201d (<em>panta ta ethn\u0113</em>) fulfills the promise to Abraham (Genesis 12:3) and the vision of Isaiah 49:6. The scope of the mission extends to every ethnic and cultural group on earth.</li>" +
          "<li>The trinitarian baptismal formula, \u201cin the name of the Father and of the Son and of the Holy Spirit,\u201d is the fullest expression of trinitarian language in the Gospels.</li>" +
          "<li>\u201cTo the end of the age\u201d (<em>he\u014ds t\u0113s synteleias tou ai\u014dnos</em>) links to Matthew\u2019s earlier eschatological language (Matthew 13:39, 49; 24:3), promising Christ\u2019s presence through every chapter of history until his return.</li>" +
          "</ul>",
        projectable: false,
      },
      {
        type: "discussion",
        content:
          "<ol>" +
          "<li>\u201cMake disciples\u201d is the central command. Who has discipled you, and what did they do that made the biggest impact on your faith?</li>" +
          "<li>The Great Commission is for \u201call nations,\u201d which means every culture and every kind of person. How does that scope challenge any tendency to limit who we think the gospel is for?</li>" +
          "<li>\u201cI am with you always, to the end of the age.\u201d As we close this series in Matthew, what does Jesus\u2019 promise of his presence mean to you in this season of your life?</li>" +
          "</ol>",
        projectable: true,
      },
      {
        type: "application",
        content:
          "<p>As we finish our journey through Matthew, what is one truth from these lessons that has taken root in your heart? How will you share it with someone else this week, continuing the chain of disciple-making that Jesus began on that mountain in Galilee?</p>",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "\u201cSome doubted\u201d even while they worshiped. Have you experienced moments where faith and doubt coexisted? How did God meet you in that tension?",
      "Jesus says all authority belongs to him. What situation in your life would look different if you lived as though that were fully true?",
      "The commission rests on Jesus\u2019 authority, not on the disciples\u2019 qualifications. How does that reshape the way you think about what God might ask of you?",
      "\u201cMake disciples\u201d is the central command. Who has discipled you, and what did they do that made the biggest impact on your faith?",
      "The Great Commission is for \u201call nations,\u201d which means every culture and every kind of person. How does that scope challenge any tendency to limit who we think the gospel is for?",
      "\u201cI am with you always, to the end of the age.\u201d As we close this series in Matthew, what does Jesus\u2019 promise of his presence mean to you in this season of your life?",
    ],
  },
];
