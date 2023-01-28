# Generated by Django 4.1.5 on 2023-01-28 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_alter_player_team"),
    ]

    operations = [
        migrations.AlterField(
            model_name="player",
            name="height",
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name="player",
            name="picture",
            field=models.ImageField(blank=True, null=True, upload_to="media/players/"),
        ),
        migrations.AlterField(
            model_name="player",
            name="weight",
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name="team",
            name="team_shield",
            field=models.ImageField(
                blank=True, null=True, upload_to="media/team_shields/"
            ),
        ),
    ]