from django.test import TestCase


class AnimalTestCase(TestCase):

  def test_success(self):
    self.assertEqual(True, True)
