from rest_framework import serializers
from .models import Profile, Skill, Interest

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name"]

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ["id", "name"]

class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    interests = InterestSerializer(many=True)


    class Meta:
        model = Profile
        fields = [
            "first_name", "last_name", "bio", "goals", "location",
            "timezone", "availability_hrs_week", "role",
            "skills", "interests", "onboarding_completed"
        ]

    def create_or_get_skills(self, skills_data):
        return [Skill.objects.get_or_create(name=s["name"])[0] for s in skills_data]

    def create_or_get_interests(self, interests_data):
        return [Interest.objects.get_or_create(name=i["name"])[0] for i in interests_data]

    def update(self, instance, validated_data):
        skills = validated_data.pop("skills", [])
        interests = validated_data.pop("interests", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if skills:
            instance.skills.set(self.create_or_get_skills(skills))

        if interests:
            instance.interests.set(self.create_or_get_interests(interests))

        instance.save()
        return instance